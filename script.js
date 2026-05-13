const ADMIN_PASSWORD =
atob("cmF6YTEyMw==");

let currentCategory = 'all';

let isAdminLoggedIn =
localStorage.getItem(
'admin_login'
) === 'true';

let products = [

  {
    id:'15269999006',
    price:'5000',
    category:'basic',
    sold:false
  },

  {
    id:'15222250222',
    price:'10000',
    category:'rare',
    sold:false
  },

  {
    id:'15251200009',
    price:'15000',
    category:'epic',
    sold:false
  }

];

/* LOAD STORAGE */
const savedProducts =
localStorage.getItem(
'ucup_products'
);

if(savedProducts){

  try{

    const parsed =
    JSON.parse(savedProducts);

    if(Array.isArray(parsed)){

      products = parsed;

    }

  }catch(error){

    localStorage.removeItem(
    'ucup_products'
    );

  }

}

/* SAVE */
function saveProducts(){

  localStorage.setItem(
  'ucup_products',
  JSON.stringify(products)
  );

}

/* CATEGORY */
window.setCategory =
function(category,btn){

  currentCategory = category;

  document
  .querySelectorAll('.cat-btn')
  .forEach(button=>{

    button.classList.remove(
    'active'
    );

  });

  btn.classList.add('active');

  renderProducts();

};

/* RENDER */
window.renderProducts =
function(){

  const grid =
  document.getElementById(
  'grid'
  );

  const search =
  document.getElementById(
  'searchInput'
  )
  .value
  .toLowerCase();

  grid.innerHTML='';

  let found = false;

  products.forEach((product,index)=>{

    const matchSearch =
    product.id
    .toLowerCase()
    .includes(search);

    const matchCategory =
    currentCategory === 'all' ||
    currentCategory ===
    product.category;

    if(
    matchSearch &&
    matchCategory
    ){

      found = true;

      const card =
      document.createElement('div');

      card.className =
      `card ${product.category}
      ${product.sold ? 'sold' : ''}`;

      card.innerHTML = `

        <p class="type">
          ${product.category.toUpperCase()}
        </p>

        <h2 class="id">
          ${product.id}
        </h2>

        <p class="price">
          Rp${Number(product.price)
          .toLocaleString('id-ID')}
        </p>

        <button
        class="buy-btn"
        onclick="buyItem('${product.id}')">
          BELI SEKARANG
        </button>

        ${
        isAdminLoggedIn
        ? `

        <button
        class="sold-btn"
        onclick="toggleSold(${index})">

          ${
          product.sold
          ? 'UNSOLD'
          : 'SOLD'
          }

        </button>

        <button
        class="delete-btn"
        onclick="deleteProduct(${index})">

          HAPUS

        </button>

        `
        : ''
        }

      `;

      grid.appendChild(card);

    }

  });

  const empty =
  document.getElementById(
  'emptyText'
  );

  if(found){

    empty.classList.add(
    'hidden'
    );

  }else{

    empty.classList.remove(
    'hidden'
    );

  }

};

/* LOGIN */
window.openLogin =
function(){

  document
  .getElementById(
  'loginPopup'
  )
  .classList.remove('hidden');

  document
  .getElementById(
  'overlay'
  )
  .classList.remove('hidden');

};

window.closeLogin =
function(){

  document
  .getElementById(
  'loginPopup'
  )
  .classList.add('hidden');

  document
  .getElementById(
  'overlay'
  )
  .classList.add('hidden');

};

window.loginAdmin =
function(){

  const password =
  document
  .getElementById(
  'adminPassword'
  )
  .value
  .trim();

  if(
  password ===
  ADMIN_PASSWORD
  ){

    isAdminLoggedIn = true;

    localStorage.setItem(
    'admin_login',
    'true'
    );

    closeLogin();

    document
    .getElementById(
    'adminPanel'
    )
    .classList.remove('hidden');

    document
    .getElementById(
    'overlay'
    )
    .classList.remove('hidden');

    showToast(
    'Login berhasil'
    );

    renderProducts();

  }else{

    showToast(
    'Password anda salah'
    );

  }

};

/* CLOSE ADMIN */
window.closeAdmin =
function(){

  document
  .getElementById(
  'adminPanel'
  )
  .classList.add('hidden');

  document
  .getElementById(
  'overlay'
  )
  .classList.add('hidden');

};

/* ADD PRODUCT */
window.addProduct =
function(){

  const id =
  document
  .getElementById(
  'idInput'
  )
  .value
  .trim();

  const price =
  document
  .getElementById(
  'priceInput'
  )
  .value
  .trim();

  const category =
  document
  .getElementById(
  'categoryInput'
  )
  .value;

  if(!id || !price){

    showToast(
    'Isi semua data'
    );

    return;

  }

  const exists =
  products.some(product=>
    product.id === id
  );

  if(exists){

    showToast(
    'ID sudah ada'
    );

    return;

  }

  products.unshift({

    id,
    price,
    category,
    sold:false

  });

  saveProducts();

  renderProducts();

  showToast(
  'ID berhasil ditambahkan'
  );

};

/* SOLD */
window.toggleSold =
function(index){

  products[index].sold =
  !products[index].sold;

  saveProducts();

  renderProducts();

};

/* DELETE */
window.deleteProduct =
function(index){

  if(
  !confirm(
  'Hapus ID ini?'
  )
  ) return;

  products.splice(index,1);

  saveProducts();

  renderProducts();

};

/* BUY */
window.buyItem =
function(id){

  document
  .getElementById(
  'qrisPopup'
  )
  .classList.remove('hidden');

  document
  .getElementById(
  'overlay'
  )
  .classList.remove('hidden');

};

/* CLOSE QRIS */
window.closeQris =
function(){

  document
  .getElementById(
  'qrisPopup'
  )
  .classList.add('hidden');

  document
  .getElementById(
  'overlay'
  )
  .classList.add('hidden');

};

/* TOAST */
function showToast(message){

  const toast =
  document.createElement('div');

  toast.className='toast';

  toast.innerText=message;

  document
  .getElementById('toast')
  .appendChild(toast);

  setTimeout(()=>{

    toast.remove();

  },2000);

}

/* INIT */
window.addEventListener(
'DOMContentLoaded',
()=>{

  renderProducts();

}
)
function closeQRIS() {
    document.getElementById('qrisPopup').classList.add('hidden');
    
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}function confirmPayment() {
    // Ganti nomor di bawah ini dengan nomor WhatsApp kamu
    // Gunakan format: 628xxxx (tanpa tanda + atau spasi)
    const nomorWA = "6289507181108"; 
    const pesan = "Halo kak, saya sudah bayar dan ini bukti transfernya! . !";
    
    // Gabungkan nomor dan pesan ke link WhatsApp
    const url = "https://api.whatsapp.com/send?phone=" + nomorWA + "&text=" + encodeURIComponent(pesan);
    
    // Buka WhatsApp di tab baru
    window.open(url, '_blank');
}