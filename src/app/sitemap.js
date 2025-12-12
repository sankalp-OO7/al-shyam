export default async function sitemap() {
  const baseUrl = "https://www.shamsgs.com";
  const currentDate = new Date().toISOString();

  // Static pages - Add all your pages here
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/download`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // If you have dynamic pages (blog posts, products), fetch them here
  // Example:
  // const posts = await fetch('your-api/posts').then(res => res.json());
  // const postUrls = posts.map(post => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'weekly',
  //   priority: 0.6,
  // }));

  return [
    ...staticPages,
    // ...postUrls, // Uncomment when you have dynamic content
  ];
}
