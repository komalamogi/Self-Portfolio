const projects = [
            {
                id: 1,
                title: "Calculator App",
                category: "web",
                description: "A responsive Calculator built using HTML, CSS, and JavaScript to perform basic arithmetic operations with a clean and intuitive interface.",
                image: "https://www.quirks.com/storage/attachments/62fc4f3b881ef72637797da8/6306bd0495d29c7d1f0665e0/original/Statistical-calculator.png",
                technologies: ["HTML",  "CSS","Javasript" ],
                link: "#"
            },
            {
                id: 2,
                title: "Weather App",
                category: "Web",
                description: "A responsive Weather Application that displays real-time weather information based on user input with a clean and intuitive interface. It focuses on user experience, dynamic data display, and responsive design.",
                image: "https://cdn.dribbble.com/userupload/2581670/file/original-4556a028d4c549717c922d095f3e1401.png",
                technologies: ["HTML",  "CSS","Javasript"],
                link: "#"
            },
            {
                id: 3,
                title: "Academy Website",
                category: "design",
                description: "A responsive Academy Website designed to showcase courses, faculty details, and essential academic information with a clean and professional layout.",
                image: "https://positive.b-cdn.net/wp-content/uploads/2024/08/Student-Success-300x150.jpg",
                technologies: ["HTML",  "CSS","Javasript","GSAP"],
                link: "#"
            },
            {
                id: 4,
                title: "To-Do-List ",
                category: "web",
                description: "An interactive To-Do List application that helps users add and manage tasks efficiently with a clean interface.",
                image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                technologies: ["HTML",  "CSS","Javasript"],
                link: "#"
            },
            {
                id: 5,
                title: "QR Generator",
                category: "Web",
                description: "A responsive QR Code Generator that creates QR codes instantly based on user input with a clean and user-friendly interface.",
                image: "https://content-management-files.canva.com/e7cf8333-91b1-481c-9544-3e7aa7d89db4/header_QR-code-generator_2x.png?resize-format=auto&resize-quality=70",
                technologies: ["HTML",  "CSS","Javasript"],
                link: "#"
            },
            {
                id: 6,
                title: "Portfolio Website Design",
                category: "design",
                description: "A responsive Portfolio Website designed to showcase projects, skills, and personal information with a clean, modern, and user-friendly layout.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                technologies: ["HTML",  "CSS","Javasript", "GSAP"],
                link: "#"
            }
        ]

    
        const header = document.getElementById('header')
        const hamburger = document.getElementById('hamburger')
        const navLinks = document.getElementById('nav-links')
        const projectsGrid = document.getElementById('projects-grid')
        const filterBtns = document.querySelectorAll('.filter-btn')
        const skillBars = document.querySelectorAll('.skill-progress')
        const contactForm = document.getElementById('contactForm')


        function initPortfolio() {
            
            renderProjects('all')

            initSkillBars()

            setupEventListeners()

            setupScrollEffects()
        }

        function renderProjects(filter) {
            projectsGrid.innerHTML = ''

            const filteredProjects = filter === 'all'
                ? projects
                : projects.filter(project => project.category === filter)

            filteredProjects.forEach((project, index) => {
                const projectCard = document.createElement('div')
                projectCard.className = 'project-card'
                projectCard.style.animationDelay = `${index * 0.1}s`
                projectCard.dataset.category = project.category

                projectCard.innerHTML = `
                    <div class="project-img-container">
                        <img src="${project.image}" alt="${project.title}" class="project-img">
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <a href="${project.link}" class="btn" style="margin-top: 15px; display: inline-block;">View Project</a>
                    </div>
                `

                projectsGrid.appendChild(projectCard)

                setTimeout(() => {
                    projectCard.classList.add('visible')
                }, 100)
            })
        }

        function initSkillBars() {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width')
                bar.style.width = '0%'

                setTimeout(() => {
                    bar.style.width = `${width}%`
                }, 500)
            })
        }

        function setupEventListeners() {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active')
                hamburger.innerHTML = navLinks.classList.contains('active')
                    ? '<i class="fas fa-times"></i>'
                    : '<i class="fas fa-bars"></i>'
            })

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active')
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>'
                })
            })

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'))
                    btn.classList.add('active')
                    const filter = btn.getAttribute('data-filter')
                    renderProjects(filter)
                })
            })
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault()

                const name = contactForm.querySelector('input[type="text"]').value
                const email = contactForm.querySelector('input[type="email"]').value
                const subject = contactForm.querySelectorAll('input[type="text"]')[1].value
                const message = contactForm.querySelector('textarea').value;

                alert(`Thank you ${name}! Your message has been sent. I'll get back to you at ${email} as soon as possible.`)

                contactForm.reset()
            })
        }

        function setupScrollEffects() {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled')
                } else {
                    header.classList.remove('scrolled')
                }
            })

            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1'
                        entry.target.style.transform = 'translateY(0)'
                    }
                })
            }, observerOptions)

            document.querySelectorAll('.project-card').forEach(card => {
                observer.observe(card)
            })
        }

        window.addEventListener('DOMContentLoaded', initPortfolio)