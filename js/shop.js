const ProductGrid = document.getElementById("ProductGrid");
const filterCategory = document.getElementById("filterCategory");
const filterBrand = document.getElementById("filterBrand");
const filterColor = document.getElementById("filterColor");
const filterPrice = document.getElementById("filterPrice");
const priceValue = document.getElementById("priceValue");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const pagination = document.getElementById("pagination");

let currentPage = 1;
const productPerPage = 6;

// Generate filter checkboxes/radios based on product data
function generateFilter(products){
    const categorySet = new Set();
    const brandSet = new Set();
    const colorSet = new Set();

    products.forEach((product) => {
      categorySet.add(product.category);
      brandSet.add(product.brand);
      product.colors.forEach((col) => colorSet.add(col));
      
    });
    filterCategory.innerHTML = Array.from(categorySet).map((cat) => `
    <label>
    <input type="radio" name="category" value="${cat}"/>${cat}
    </label>
    `
)
    .join("");

     filterBrand.innerHTML = Array.from(brandSet).map((brand) => `
    <label>
    <input type="radio" name="brand" value="${brand}"/>${brand}
    </label>
    `
)
    .join("");

      filterColor.innerHTML = Array.from(colorSet).map((color) => `
    <label>
    <input type="checkbox" name="color" value="${color}"/>${color}
    </label>
    `
)
    .join("");

    //price Filter
    const maxPrice = Math.max(...products.map((p) => p.price));
    filterPrice.max = Math.ceil(maxPrice);
    filterPrice.value = filterPrice.max;
    priceValue.textContent = filterPrice.value;

    }
// Get currently selected filters
    function getSelectedFilters(){
        //category filter
        const categoryRadio = filterCategory.querySelector('input[name="category"]:checked');
        const selectedCategory = categoryRadio ? categoryRadio.value : null;

        //brand filter
        const brandRadio = filterBrand.querySelector('input[name="brand"]:checked');
        const selectedBrand = brandRadio ? brandRadio.value : null;

        //colors filter
        const colorCheckboxes = [...filterColor.querySelectorAll(`input[name="color"]:checked`),];
        const selectedColors = colorCheckboxes.map((c) => c.value);

        //price filter
        const selectedPrice = Number(filterPrice.value);

        //search filter
        const searchText = searchInput.value.trim().toLowerCase();

        //sort filter
        const sortValue = sortSelect.value;

        return{
            selectedCategory,
            selectedBrand,
            selectedColors,
            selectedPrice,
            searchText,
            sortValue
        }


    }

    // Filter and sort products based on selections
    function filterAndRenderProducts(){
        const  {
            selectedCategory,
            selectedBrand,
            selectedColors,
            selectedPrice,
            searchText,
            sortValue
        } = getSelectedFilters();

        let filtered = products.filter((p)=>{
            //category filter
            if(selectedCategory && p.category !== selectedCategory) return false;

             //brand filter
            if(selectedBrand && p.brand !== selectedBrand) return false;

            //color filter
            if(selectedColors.length > 0){
                const hasColor = p.colors.some((c) =>selectedColors.includes(c));
                if (!hasColor) return false;
                
            }

            //price filter
            if (p.price > selectedPrice) return false;

            //serach filter
            if (searchText && !p.name.toLowerCase().includes(searchText) && !p.brand.toLowerCase().includes(searchText)) {
                return false;
            }

     return true;
        });

        //sorting
        if(sortValue === "price-asc"){
            filtered.sort((a, b)=>a.price - b.price);
        }else if(sortValue === "price-desc"){
            filtered.sort((a, b)=>b.price - a.price);
        }else if(sortValue === "name-asc"){
            filtered.sort((a, b)=>a.name.localeCompare(b.name));
        }else if(sortValue === "name-desc"){
            filtered.sort((a, b)=>b.name.localeCompare(a.name));
        }

        //pagination
        const totalPages = Math.ceil(filtered.length / productPerPage);
        if(currentPage > totalPages) currentPage = totalPages || 1;

        const startsIndex = (currentPage-1) * productPerPage;
        const paginationProduct = filtered.slice(startsIndex, startsIndex + productPerPage);
            
        renderProducts(paginationProduct);
        renderPagination(totalPages);

    }

    function renderProducts(productToRender){
  row.innerHTML ="";
   if(productToRender.length === 0){
    ProductGrid.textContent = "No products found"
   }

  productToRender.forEach((product) =>{
    const card =document.createElement('div');
    card.classList.add('col-sm-6');
    card.setAttribute('data-category', product.category);
    card.innerHTML = `
    
    <div class="product_card product_shop_card">
    <div class="product_img product_shop_img">
    <img src="${product.images[0]}" alt="">
       </div>
      <div class="product_content product_shop_text ">
        <h3><a href="product.html?slug=${product.slug}">${product.name.slice(0, 30)}...</a></h3>
                               
           </div>
           
              
             </div>
               

    `;
    row.appendChild(card);
  });
   $('.product_content  h3').matchHeight();
}
    
function renderPagination(totalPages){
    pagination.innerHTML = "";
    if (totalPages <= 1) return;
    for(let i=1; i <= totalPages; i++){
        const btn = document.createElement("button");
        btn.textContent = i;
        if(i=== currentPage) btn.disabled = true;
        btn.addEventListener("click", ()=>{
            currentPage = i;
            filterAndRenderProducts();
            window.scrollTo(0,0);
        });
        pagination.appendChild(btn);
    }
}
  

function resetFilters(){
    //category
    const categoryRadio = filterCategory.querySelectorAll(`input[name='category']`);

    categoryRadio.forEach((radio)=>{
        radio.checked = radio.value === "";
    });
  
    //brand
      const brandRadio = filterBrand.querySelectorAll(`input[name='brand']`);
    brandRadio.forEach((radio)=>{
        radio.checked = radio.value === "";
    });

     //color
    const colorCheckboxes = filterColor.querySelectorAll(`input[name='color']`);
    colorCheckboxes.forEach((checkbox)=>(checkbox.checked = false));

    //price
    filterPrice.value = filterPrice.max;
    priceValue.textContent = filterPrice.value;

    //search
    searchInput.value ="";

    //sort
    sortSelect.value = "default";
    currentPage =1;
    filterAndRenderProducts();

}

document.getElementById("resetFilterBtn").addEventListener("click", resetFilters);

     //category
    filterCategory.addEventListener("change", () =>{
        currentPage = 1; 
        filterAndRenderProducts();
    });

      //brands
    filterBrand.addEventListener("change", () =>{
        currentPage = 1; 
        filterAndRenderProducts();
    });

      //colors
    filterColor.addEventListener("change", () =>{
        currentPage = 1; 
        filterAndRenderProducts();
    });

      //price
    filterPrice.addEventListener("input", () =>{
        priceValue.textContent = filterPrice.value;
        currentPage = 1; 
        filterAndRenderProducts();
    });

      //serach
    searchInput.addEventListener("input", () =>{
        currentPage = 1; 
        filterAndRenderProducts();
    });

      //sort
    sortSelect.addEventListener("change", () =>{
        currentPage = 1; 
        filterAndRenderProducts();
    });
generateFilter(products);
    filterAndRenderProducts();
    

//filter hide and show
const mobileFilterBtn = document.querySelector(".mobile_filter_btn");
const mobileFilterCloseBtn = document.querySelector(".mobile_filter_close_btn");
const filters = document.querySelector('.filters');

mobileFilterBtn.addEventListener('click', () => {
    filters.classList.add('active');
});
mobileFilterCloseBtn.addEventListener('click', () => {
    filters.classList.remove('active');
});