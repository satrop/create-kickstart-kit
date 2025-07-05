// Example navigation data structure for your project
// You can customize this based on your site's needs

export const navigationData = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Web Development",
        href: "/products/web-development",
        children: [
          { label: "Frontend Development", href: "/products/web-development/frontend" },
          { label: "Backend Development", href: "/products/web-development/backend" },
          { label: "Full Stack Solutions", href: "/products/web-development/fullstack" },
          { label: "E-commerce Platforms", href: "/products/web-development/ecommerce" }
        ]
      },
      {
        label: "Mobile Apps",
        href: "/products/mobile-apps",
        children: [
          { label: "iOS Development", href: "/products/mobile-apps/ios" },
          { label: "Android Development", href: "/products/mobile-apps/android" },
          { label: "Cross-platform Apps", href: "/products/mobile-apps/cross-platform" },
          { label: "Progressive Web Apps", href: "/products/mobile-apps/pwa" }
        ]
      },
      {
        label: "Design Services",
        href: "/products/design",
        children: [
          { label: "UI/UX Design", href: "/products/design/ui-ux" },
          { label: "Brand Identity", href: "/products/design/branding" },
          { label: "Graphic Design", href: "/products/design/graphics" }
        ]
      },
      {
        label: "Consulting",
        href: "/products/consulting"
      }
    ],
    // Mega menu content (only used for mega variant)
    megaContent: {
      title: "Our Products & Services",
      description: "Comprehensive digital solutions to help your business thrive in the modern world",
      image: "/images/image1.jpg",
      featured: [
        { label: "Popular: React Development", href: "/products/web-development/react" },
        { label: "New: AI Integration", href: "/products/ai-integration" },
        { label: "Featured: E-commerce", href: "/products/web-development/ecommerce" },
        { label: "Package Deals", href: "/products/packages" }
      ]
    }
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "For Startups",
        href: "/solutions/startups",
        children: [
          { label: "MVP Development", href: "/solutions/startups/mvp" },
          { label: "Technical Strategy", href: "/solutions/startups/strategy" },
          { label: "Scalable Architecture", href: "/solutions/startups/architecture" }
        ]
      },
      {
        label: "For Enterprises",
        href: "/solutions/enterprise",
        children: [
          { label: "Digital Transformation", href: "/solutions/enterprise/transformation" },
          { label: "Legacy System Migration", href: "/solutions/enterprise/migration" },
          { label: "Custom Integrations", href: "/solutions/enterprise/integrations" }
        ]
      },
      {
        label: "For Agencies",
        href: "/solutions/agencies",
        children: [
          { label: "White Label Solutions", href: "/solutions/agencies/white-label" },
          { label: "Partner Programs", href: "/solutions/agencies/partnerships" },
          { label: "Resource Augmentation", href: "/solutions/agencies/resources" }
        ]
      }
    ],
    megaContent: {
      title: "Tailored Solutions",
      description: "Industry-specific solutions designed to meet your unique business challenges",
      image: "/images/image2.jpg",
      featured: [
        { label: "Free Consultation", href: "/consultation" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "ROI Calculator", href: "/roi-calculator" },
        { label: "Success Stories", href: "/success-stories" }
      ]
    }
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Documentation", href: "/docs" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Downloads", href: "/downloads" },
      { label: "Community", href: "/community" },
      { label: "Support", href: "/support" }
    ]
  },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "News & Press", href: "/press" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" }
    ]
  }
];

export const logo = {
  src: "/favicon.svg",
  alt: "Your Company Logo",
  href: "/"
};

// Example usage in an Astro component:
/*
---
// For standard dropdown navigation
import StandardNavigation from '../components/Navigation/StandardNavigation.astro';
// OR for mega menu navigation  
import MegaNavigation from '../components/Navigation/MegaNavigation.astro';
import { navigationData, logo } from '../data/navigation.js';
---

<!-- Standard Navigation -->
<StandardNavigation 
  items={navigationData}
  mobileAnimation="left"
  logo={logo}
/>

<!-- OR Mega Navigation -->
<MegaNavigation 
  items={navigationData}
  mobileAnimation="left"
  logo={logo}
/>

<!-- OR Mega Menu Navigation -->
<NavigationComponent 
  variant="mega"
  items={navigationData}
  mobileAnimation="top"
  logo={logo}
/>
*/
