
const client = supabase.createClient("https://myntrgzxirmbhxjuvxok.supabase.co", 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15bnRyZ3p4aXJtYmh4anV2eG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzOTAxMTIsImV4cCI6MjA2Nzk2NjExMn0.WTZUhDpQa1CAN_Bs_ph_02kaktyRn1dqC51xeAnLC-A");

document.getElementById('storyForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const text = document.getElementById('text').value;
  const image = document.getElementById('image').value;
  const { error } = await client.from('stories').insert([{ title, text, image_url: image }]);
  if (error) { alert('Ошибка: ' + error.message); } else { alert('Добавлено!'); location.reload(); }
});

async function loadStories() {
  const { data, error } = await client.from('stories').select('*').order('created_at', { ascending: false });
  const container = document.getElementById('stories');
  data.forEach(story => {
    const card = document.createElement('div');
    card.innerHTML = `
      ${story.image_url ? `<img src="${story.image_url}" style="width:100%;border-radius:8px;" />` : ''}
      <h3>${story.title}</h3>
      <p>${story.text}</p>
    `;
    container.appendChild(card);
  });
}
loadStories();
