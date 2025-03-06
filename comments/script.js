import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://glprxvdpjkydgshlwdqu.supabase.co';
const supabaseKey = 'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscHJ4dmRwamt5ZGdzaGx3ZHF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDMzOTEsImV4cCI6MjA1NjgxOTM5MX0'; //It is best to not use process.env on client side code.
const supabase = supabase.createClient(supabaseUrl, supabaseKey);


const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

// Function to fetch and display comments
async function fetchComments() {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching comments:', error);
        return;
    }

    commentsList.innerHTML = ''; // Clear existing comments

    data.forEach(comment => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${comment.username}:</strong> ${comment.comment}`;
        commentsList.appendChild(li);
    });
}

// Function to handle form submission
commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const comment = document.getElementById('comment').value;

    const { error } = await supabase
        .from('comments')
        .insert([{ username, comment }]);

    if (error) {
        console.error('Error submitting comment:', error);
        return;
    }

    document.getElementById('username').value = ''; //clear input fields.
    document.getElementById('comment').value = '';

    fetchComments(); // Refresh comments
});

// Initial fetch of comments
fetchComments();