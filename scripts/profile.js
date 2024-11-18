function profile() {
  // To remove everything from the right sight except for profile language and public profile & url
  // Select the aside element on the right
  const asideElement = document.querySelector("aside.scaffold-layout__aside");
  if (asideElement) {
    // Remove profile recommendations
    const profileCard = asideElement.querySelector(
      "section.artdeco-card.pv-profile-card.break-words.mt2[data-view-name='profile-card']"
    );

    // Remove the section element if it exists
    if (profileCard) {
      profileCard.remove();
    }
  }
  // Remove Recommendations for Courses
  const courseElement = document.querySelector(
    "section.pv-course-recommendations"
  );
  if (courseElement) {
    courseElement.remove();
  }
}
