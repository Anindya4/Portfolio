in which file i can modify my projects and add more?

  All your projects are centralized in one single file:                                                                               
                                                                                                                                      
  ### 📂 File Location:                                                                                                               
                                                                                                                                      
  👉 **portfolioData.ts**                                                                                                             
  ──────                                                                                                                              
  ### 🛠️ How to Modify or Add More Projects                                                                                           
                                                                                                                                      
  Look for the export const PROJECTS_DATA: Project[] = [...] array starting around line 72.                                           
                                                                                                                                      
  To add a new project, simply copy and paste an entry inside the array:                                                              
                                                                                                                                      
    {                                                                                                                                 
      id: "my-new-project",                     // Unique ID (e.g. 'smart-vision-ai')                                                 
      title: "Your Project Title",              // Main title                                                                         
      subtitle: "Short Subtitle / Tagline",     // Subheading                                                                         
      category: "Machine Learning",             // 'CV + NLP' | 'Machine Learning' | 'Data Engineering' | 'Full Stack'                
      year: "2025",                             // Release or completion year                                                         
      description: "Brief summary for the card (2-3 sentences)...",                                                                   
      fullDescription: "In-depth case study and architecture overview that shows when someone clicks the card...",                    
                                                                                                                                      
      metrics: [                                // Key metric statistics (shown in modal)                                             
        { label: "Accuracy", value: "99.2%" },                                                                                        
        { label: "Inference Latency", value: "12ms" },                                                                                
        { label: "Throughput", value: "1.2k req/s" }                                                                                  
      ],                                                                                                                              
                                                                                                                                      
      tags: ["PyTorch", "FastAPI", "Docker", "OpenCV"], // Tech stack badges                                                          
                                                                                                                                      
      links: {                                                                                                                        
        live: "https://your-demo-url.com",      // Live demo or deployment link                                                       
        github: "https://github.com/your-username/repo-name" // GitHub repo link                                                      
      },                                                                                                                              
                                                                                                                                      
      gridSpan: {                                                                                                                     
        desktop: "col-span-12 lg:col-span-7",   // 'col-span-12 lg:col-span-7' (wider) or 'col-span-12 lg:col-span-5' (compact)       
        height: "min-h-[420px]"                                                                                                       
      },                                                                                                                              
                                                                                                                                      
      accentColor: "#8fa89b",                   // Subtle accent dot color                                                            
      featured: true,                           // true or false                                                                      
      status: "Completed",                      // e.g. "Completed", "In Development", "Deployed"
      
      deliverables: [                           // Bullet points shown in the modal
        "Multi-class detector model",
        "RESTful API inference endpoint",
        "Streamlit demonstration dashboard"
      ],
      
      mockType: "football"                      // 'football' | 'plant' | 'scraper' | 'youtube'
    }
  ──────
  ### 💡 Quick Tips
  
  • Filter Tabs: Any project with category: "CV + NLP", "Machine Learning", "Data Engineering", or "Full Stack" will automatically be 
  filtered when visitors click the tabs.
  • Card Widths: Use col-span-12 lg:col-span-7 for wider cards and col-span-12 lg:col-span-5 for smaller ones (or col-span-12 for     
  full-width).
  • Personal Info & Resumes: In the same file (portfolioData.ts), you can also edit your PERSONAL_INFO (bio, email, stats) and        
  RESUME_LINKS (Google Drive links).

   ### 💬 2. How to Continue in Antigravity                                                                                            
                                                                                                                                      
  • In the CLI / Chat: You can reopen this workspace anytime (/home/anindya/Coding/portfolio).                                        
  • You can reference this conversation directly: Conversation conversation://311433f7-fbd8-47cb-93a5-2ac7ee74d9b3.                   
  • Just say: "Let's continue working on my portfolio" and I will have full context of all your components, styles, and               
  configurations! 