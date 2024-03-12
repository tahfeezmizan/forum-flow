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