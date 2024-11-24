function mynetwork() {
  /* Remove the LinkedIn Premium Add to Grow Network Smarter and the entire network suggestions with suggested people. */
  const navElement = document.querySelector("main");

  // Check if navElement is found
  if (navElement) {
    // Remove the 5th element (a div)
    const fifthElement = navElement.children[4];
    if (fifthElement) {
      fifthElement.remove();
    }

    // Remove the 6th element (a section with class 'artdeco-card')
    const sixthElement = navElement.children[5]; // Index 5 now refers to the 6th element after removing the 5th

    if (
      sixthElement &&
      sixthElement.tagName === "SECTION" &&
      sixthElement.classList.contains("artdeco-card")
    ) {
      sixthElement.remove();
    }
  } else {
    console.error("navElement not found");
  }
}
