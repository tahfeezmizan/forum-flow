const postContainer = document.getElementById('post-container');
const finishedRead = document.getElementById('finished-read');
const latestPost = document.getElementById('latest-post');

const fetchData = (search) => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            const dataItem = data.posts;

            dataItem.forEach(data => {

                const newDiv = document.createElement('div');
                newDiv.innerHTML = `
                <div class="flex flex-col md:flex-row items-center gap-10 bg-gray-100 p-5 lg:p-10  rounded-3xl  hover:border-blue-300 hover:bg-blue-50 duration-300">
                                              
                    <div class="relative">
                        <img class="w-16 h-16 rounded-xl" src="${data.image}" alt="">
                        <span class="badge indicator-item -top-1 left-12 absolute w-4 h-4 rounded-full" style="background-color: ${data.isActive ? 'green' : 'red'};"></span>
                    </div>    

                    <div class="">
                        <div class="flex gap-5 mb-3">
                            <p class="inter text-sm text-black opacity-75 font-medium">#${data.category}</p> 
                            <p class="inter text-sm text-black opacity-75 font-medium">Author: ${data.author.name}</p> 
                        </div>
                        <h3 class="mulish text-xl font-bold mb-4">${data.title}</h3>
                        <p class="inter text-base text-black opacity-60 mb-5">${data.description}</p>

                        <div class="flex gap-2 items-center justify-between pt-4 border-t border-dashed border-black ">
                            <div class="flex gap-7 items-center">
                                <p class="inter text-base text-black opacity-60"><i class="fa-regular fa-comment"></i> ${data.comment_count}</p>
                                <p class="inter text-base text-black opacity-60"><i class="fa-regular fa-eye"></i> ${data.view_count}</p>
                                <p class="inter text-base text-black opacity-60"><i class="fa-regular fa-clock"></i> 5 min</p>
                            </div>
                            <button onclick="clickBtn('${data?.title.replace(/'/g, '@')}', '${data?.view_count}')" id="read-finished-btn" class="btn bg-green-600 text-white rounded-full"><i class="fa-regular fa-envelope-open"></i></button>
                        </div>
                    </div>
                </div>
                `
                postContainer.appendChild(newDiv);
            });

            // hide loading spinner 
            toggleLoadingSpinner(false);
        })

}

const searchDataByCategories = () => {
    toggleLoadingSpinner(true);

    const searchField = document.getElementById('search-filed');
    const searchText = searchField.value;
    searchField.value = ''
    postContainer.innerHTML = '';

    fetchData(searchText)
}

// loading spinner function 
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');

    if (isLoading) {
        loadingSpinner.classList.remove('hidden')

        setTimeout(() => {
            toggleLoadingSpinner(false);
        }, 2000);
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}


// finished forum item add
const ReadTotalForum = document.getElementById('totalReadForum');
let readItemIncrement = parseInt(ReadTotalForum.innerText || '0');

function clickBtn(title, view) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('flex', 'gap-4', 'items-center', 'bg-white', 'rounded-2xl', 'p-4', 'hover:bg-blue-50', 'duration-300');
    newDiv.innerHTML = `
        <h3 class="mulish text-lg font-bold">${title}</h3>
        <p class="inter text-base text-black opacity-60 flex items-center gap-3"><i
                class="fa-regular fa-eye"></i> ${view}</p>
    `;
    finishedRead.appendChild(newDiv);
    readItemIncrement++;
    ReadTotalForum.innerText = readItemIncrement;
}

// latest post data load 
const latestPostLoad = () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts';
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            const postItem = { data }.data
            postItem.forEach(data => {
                const newPostDiv = document.createElement('div');
                newPostDiv.innerHTML = `
                <div class="card w-{340px} md:w-96 mx-auto bg-base-100 shadow-xl">
                    <figure class="px-6 lg:px-10 pt-10">
                        <img src="${data.cover_image}" alt="Shoes"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body px-6 lg:px-10">
                        <p class="text-base mulish text-black opacity-70 flex gap-3 items-center"><i
                                class="fa-regular fa-calendar-days"></i>${data.author?.posted_date ? data.author?.posted_date : 'no date published'}</p>
                        <h2 class="card-title mulish text-lg font-extrabold text-black opacity-80 mb-2">${data.title}</h2>
                        <p class="mulish text-base text-black opacity-70 font-normal mb-4">${data.description}</p>

                        <div id="" class="flex gap-5 items-center">
                            <div>
                                <img class="w-12 h-12 rounded-full" src="${data.profile_image}"
                                    alt="">
                            </div>
                            <div class="">
                                <h2 class="font-bold text-base pb-1">${data.author?.name}</h2>
                                <h4 class="text-sm pb-2">${data.author?.designation ? data.author?.designation : 'Unknown'}</h4>
                            </div>
                        </div>
                    </div>
                </div> `
                latestPost.appendChild(newPostDiv);
            })
        })
}

latestPostLoad()
fetchData('')


