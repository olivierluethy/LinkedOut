function mynetwork() {
  /* Remove the LinkedIn Premium Add to Grow Network Smarter and the entire network suggestions with suggested people. */
  // Get the container element
  const container = document.querySelector("[data-view-name='cohorts-list']");

  // Get the div element inside the container
  const divElement = container.querySelector("div");

  if (divElement) {
    // Get all child elements of the div element
    const childElements = divElement.children;

    // Convert the HTMLCollection to an array
    Array.prototype.slice.call(childElements).forEach((child) => {
      // Check if the child element is not the one we want to keep
      if (child.getAttribute("data-view-name") !== "invitation-preview") {
        // Remove the child element
        child.remove();
      }
    });
  }
}
