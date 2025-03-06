import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://glprxvdpjkydgshlwdqu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscHJ4dmRwamt5ZGdzaGx3ZHF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDMzOTEsImV4cCI6MjA1NjgxOTM5MX0.bN7BOXLlioQ2Gp5gJfvxKSf9DK7MgsWZISrwqfMkCPk';

export const supabase = createClient(supabaseUrl, supabaseKey);

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

    commentsList.innerHTML = '';

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

    document.getElementById('username').value = '';
    document.getElementById('comment').value = '';

    fetchComments();
});

// Initial fetch of comments
fetchComments();