const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const userEmailSpan = document.getElementById("user-email");
const gallery = document.getElementById("gallery");

async function checkUser() {
  const { data, error } = await supabase.auth.getUser();
  if (data.user) {
    userEmailSpan.textContent = `مرحبًا ${data.user.email}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
  } else {
    loginBtn.style.display = "inline";
    logoutBtn.style.display = "none";
  }
}

loginBtn.onclick = async () => {
  await supabase.auth.signInWithOAuth({ provider: "google" });
};

logoutBtn.onclick = async () => {
  await supabase.auth.signOut();
  location.reload();
};

async function loadArtworks() {
  const { data, error } = await supabase
    .from('artworks')
    .select("*")
    .order('created_at', { ascending: false });

  if (data) {
    gallery.innerHTML = "";
    data.forEach((art) => {
      const div = document.createElement("div");
      div.className = "art-card";
      div.innerHTML = `
        <h3>${art.title}</h3>
        <img src="${art.image_url}" alt="${art.title}" />
        <p>تم بواسطة: ${art.user_email}</p>
        <p>❤️ ${art.likes}</p>
        <button onclick="likeArt('${art.id}')">إعجاب</button>
      `;
      gallery.appendChild(div);
    });
  }
}

window.likeArt = async (id) => {
  const { data, error } = await supabase.rpc("increment_like", { art_id: id });
  if (!error) loadArtworks();
};

checkUser();
loadArtworks();
