# Analytics-page-slushy

## Overview of the Code
The provided code implements an Analytics Dashboard for a web application. It includes tabbed navigation and dynamic visualizations, such as pie charts for gender demographics and bar charts for age distributions, using Nivo Charts. It fetches data from APIs, processes it, and renders interactive charts, making it user-friendly and visually informative.

## Key Features and Functionality
- **Tabbed Navigation**:
   The Analytics component uses a tabbed interface to switch between different data views (Conversion, Audience, Engagement, Top Posts).
   Tabs provide a clean way to segment and present data while maintaining an intuitive user interface.
  
- **Dynamic Content Loading**:
   Tabs fetch relevant data (e.g., demographics) via APIs (getMyDemographicsAnalytics) when mounted.
   This ensures efficiency by only loading data when needed and improves page load performance.
  
- **Charts with Nivo**:
  The AudienceTab displays demographic analytics using Nivo charts (ResponsiveBar and ResponsivePie).
  I learned how to use Nivo charts during this task. The charts are styled with themes, custom color mapping, and legends for a polished look.

- **Error Handling**:
    Fetching demographic data from an API is wrapped in error handling. Errors are displayed to the user through toasts using the useToasts context.

## Why I Chose This Approach
- **Component Composition**:
By separating each tab into distinct components, the codebase remains modular and easier to maintain. For example, the AudienceTab focuses solely on demographics, making it independent and reusable.

- **Stateful Navigation**:
Using useState for tab management and scroll preservation ensures a seamless experience when switching between tabs or navigating back to the component.

- **Learning & Experimentation**:
While working on this project, I explored Nivo charts for the first time. It allowed me to quickly implement visually appealing and interactive analytics with minimal effort, demonstrating my ability to learn and integrate new libraries effectively.

- **User-Centered Design**:
Conditional rendering with SlushyLoader ensures users don’t encounter empty states. The navigation and header components offer an intuitive experience tailored to different screen sizes.

## Stack Used
- **Next.js** - For building the front-end and server-side rendering (SSR).
- **Nest.js** - For backend API and business logic.
- **Axios** - For making HTTP requests and interacting with the backend API.
- **TypeScript** - To ensure type safety across the application.

https://github.com/user-attachments/assets/05975d76-8daf-420b-a477-abb15fdb5fca

