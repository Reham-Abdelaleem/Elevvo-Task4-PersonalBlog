// ===== Blog Posts Data =====
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with React Hooks in 2024",
        description: "Learn how to use React Hooks effectively in your applications. A comprehensive guide covering useState, useEffect, and custom hooks.",
        category: "tech",
        date: "January 15, 2024",
        image: "images/tech-1.jfif"
    },
    {
        id: 2,
        title: "10 Hidden Gems in Tokyo You Must Visit",
        description: "Discover the secret spots in Tokyo that most tourists miss. From hidden temples to underground cafes, explore the authentic side of Japan.",
        category: "travel",
        date: "January 12, 2024",
        image: "images/travel-1.jfif"
    },
    {
        id: 3,
        title: "The Ultimate Guide to Italian Pasta",
        description: "Master the art of making authentic Italian pasta from scratch. Tips, techniques, and traditional recipes passed down through generations.",
        category: "food",
        date: "January 10, 2024",
        image: "images/food-1.jfif"
    },
    {
        id: 4,
        title: "Building Scalable Web Applications",
        description: "Best practices for building web applications that scale. Learn about architecture patterns, performance optimization, and cloud deployment.",
        category: "tech",
        date: "January 8, 2024",
        image: "images/tech-2.jfif"
    },
    {
        id: 5,
        title: "Backpacking Through Southeast Asia",
        description: "A complete guide to backpacking through Thailand, Vietnam, and Cambodia on a budget. Tips, routes, and must-see destinations.",
        category: "travel",
        date: "January 5, 2024",
        image: "images/travel-2.jfif"
    },
    {
        id: 6,
        title: "Healthy Meal Prep for Busy Professionals",
        description: "Simple and nutritious meal prep ideas that save time and money. Perfect for anyone with a hectic schedule who wants to eat healthy.",
        category: "food",
        date: "January 3, 2024",
        image: "images/food-2.jfif"
    },
    {
        id: 7,
        title: "Introduction to Machine Learning with Python",
        description: "Start your journey into machine learning with Python. Learn the basics of algorithms, data preprocessing, and model training.",
        category: "tech",
        date: "December 28, 2023",
        image: "images/tech-3.jfif"
    },
    {
        id: 8,
        title: "Road Trip Across New Zealand",
        description: "Experience the breathtaking beauty of New Zealand on a road trip. From glaciers to beaches, discover the best routes and stops.",
        category: "travel",
        date: "December 25, 2023",
        image: "images/travel-3.jfif"
    },
    {
        id: 9,
        title: "Mastering French Pastries at Home",
        description: "Bring the French patisserie to your kitchen. Learn to make croissants, macarons, and other classic French desserts.",
        category: "food",
        date: "December 22, 2023",
        image: "images/food-3.jfif"
    },
    {
        id: 10,
        title: "The Future of Artificial Intelligence",
        description: "Explore the latest trends in AI and what they mean for the future. From GPT models to autonomous systems, discover what's next.",
        category: "tech",
        date: "December 20, 2023",
        image: "images/tech-4.jfif"
    },
    {
        id: 11,
        title: "Exploring Iceland's Natural Wonders",
        description: "Journey through Iceland's stunning landscapes. Waterfalls, hot springs, and the Northern Lights await in this magical destination.",
        category: "travel",
        date: "December 18, 2023",
        image: "images/travel-4.jfif"
    },
    {
        id: 12,
        title: "Plant-Based Cooking for Beginners",
        description: "Transition to a plant-based diet with these easy and delicious recipes. Healthy, sustainable, and full of flavor.",
        category: "food",
        date: "December 15, 2023",
        image: "images/food-2.jfif"
    },
    {
        id: 13,
        title: "Web Design Trends for 2024",
        description: "Stay ahead of the curve with the latest web design trends. From minimalism to bold typography, discover what's shaping the web.",
        category: "tech",
        date: "December 12, 2023",
        image: "images/tech-5.jfif"
    },
    {
        id: 14,
        title: "A Week in Barcelona: Complete Guide",
        description: "Experience the best of Barcelona in one week. Architecture, food, beaches, and nightlife - everything you need to know.",
        category: "travel",
        date: "December 10, 2023",
        image: "images/travel-5.jfif"
    },
    {
        id: 15,
        title: "The Art of Homemade Bread Baking",
        description: "Learn the secrets to baking perfect bread at home. From sourdough to focaccia, master the basics and beyond.",
        category: "food",
        date: "December 8, 2023",
        image: "images/food-3.jfif"
    }
];
// ===== State Variables =====
let currentPage = 1;
const postsPerPage = 6;
let filteredPosts = [...blogPosts];
let currentCategory = 'all';
let searchQuery = '';
// ===== DOM Elements =====
const postsGrid = document.getElementById('postsGrid');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const filterBtns = document.querySelectorAll('.filter-btn');
const resultsCount = document.querySelector('.results-info .count');
const noResults = document.getElementById('noResults');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');
// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
    renderPosts();
    setupEventListeners();
});
// ===== Event Listeners =====
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', handleSearch);
    // Clear search button
    clearSearchBtn.addEventListener('click', clearSearch);
    // Category filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleCategoryFilter);
    });
    // Pagination
    prevBtn.addEventListener('click', () => changePage(currentPage - 1));
    nextBtn.addEventListener('click', () => changePage(currentPage + 1));
}
// ===== Search Function =====
let searchTimer;
function handleSearch(e) {
    const val = e.target.value;
    // show/hide clear button immediately
    if (val.length > 0) {
        clearSearchBtn.classList.add('show');
    } else {
        clearSearchBtn.classList.remove('show');
    }
    // debounce filter
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        searchQuery = val.toLowerCase().trim();
        filterPosts();
    }, 150);
}
function clearSearch() {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.classList.remove('show');
    filterPosts();
}
// ===== Category Filter Function =====
function handleCategoryFilter(e) {
    const category = e.currentTarget.dataset.category; 
    // Update active button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');
    currentCategory = category;
    filterPosts();
}
// ===== Filter Posts =====
function filterPosts() {
    filteredPosts = blogPosts.filter(post => {
        const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
        const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });
    currentPage = 1;
    renderPosts();
}
// ===== Render Posts =====
function renderPosts() {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);
    // Update results count
    resultsCount.textContent = filteredPosts.length;
    // Check if there are posts to show
    if (filteredPosts.length === 0) {
        postsGrid.innerHTML = '';
        noResults.classList.add('show');
        document.getElementById('pagination').style.display = 'none';
        return;
    } else {
        noResults.classList.remove('show');
        document.getElementById('pagination').style.display = 'flex';
    }
    // Clear grid
    postsGrid.innerHTML = '';
    // Render posts with stagger animation
    postsToShow.forEach((post, index) => {
        const postCard = createPostCard(post);
        postCard.style.animationDelay = `${index * 0.1}s`;
        postsGrid.appendChild(postCard);
    });
    // Update pagination
    updatePagination();
    // Observe new cards
    observePostCards();
}
// ===== Create Post Card =====
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
        <div class="post-image-wrapper">
            <img src="${post.image}" alt="${post.title}" class="post-image">
            <span class="post-category text-white ${post.category}">${post.category}</span>
        </div>
        <div class="post-content">
            <div class="post-date d-flex align-items-center gap-2 mb-3">
                <i class="fa-regular fa-calendar-days"></i>
                <span>${post.date}</span>
            </div>
            <h3 class="post-title mb-3">${post.title}</h3>
            <p class="post-description mb-4">${post.description}</p>
            <a href="#" class="read-more d-inline-flex align-items-center gap-2 text-decoration-none">
                Read More
                <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    `;
    // Add click event
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.read-more')) {
            window.location.href = `#post-${post.id}`;
        }
    });
    return card;
}
// ===== Pagination Functions =====
function updatePagination() {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    // Update prev/next buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    // Clear page numbers
    pageNumbers.innerHTML = '';
    // Generate page numbers
    for (let i = 1; i <= totalPages; i++) {
        // Show only relevant page numbers (max 5)
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-number d-flex align-items-center justify-content-center';
            pageBtn.textContent = i;
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.addEventListener('click', () => changePage(i));
            pageNumbers.appendChild(pageBtn);
        } else if (
            i === currentPage - 2 ||
            i === currentPage + 2
        ) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.padding = '0 10px';
            dots.style.color = 'var(--text-light)';
            pageNumbers.appendChild(dots);
        }
    }
}
function changePage(page) {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPosts();
    // Scroll to top of posts section smoothly
    document.querySelector('.blog-posts').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}
// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// ===== Newsletter Form =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        // Simple success message (replace with actual API call)
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        this.reset();
    });
}
// ===== Animation on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);
// Observe post cards as they're created
const observePostCards = () => {
    document.querySelectorAll('.post-card').forEach(card => {
        observer.observe(card);
    });
};
// Call after rendering posts
observePostCards();
// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});
// Close nav when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
    });
});
// Close nav on outside click
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
    }
});
// ===== Console Message =====
console.log('%cPersonal Blog Homepage', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'color: #6b7280; font-size: 14px;');
console.log(`%cTotal Posts: ${blogPosts.length}`, 'color: #10b981; font-size: 14px;');