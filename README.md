# Description

We will be creating a frontend application.
We will have one hour to perform this task.

Purpose:
We want to create an in house Bot Detection Image Verification Application and our backend team is busy so we're going to have to code this whole thing up on the frontend.

Our designer is on vacation so no need to make things pretty.

## Requirements

- [x] A 3 by 3 grid of 200x200px images.
- [x] Fill that grid with at least two different categories of images.
- [x] Display the category that the user should select. (Valid)
- [x] Provide a submit button.
- If the user pushes the submit button, verify that none of the images displayed are of the Valid Set category.  
  - If the user has completed the selection correctly, indicate that we can proceed and reset the system.
  - If the user has completed the selection incorrectly, indicate that we cannot proceed and reset the system.

Logic for a user selection:
When the user selects an image from the valid category replace it with an image from the invalid category.
When the user selects an image from an invalid category replace it with an image from an valid category.
  
It may be helpful to use an image generator to fetch images.
<http://loremflickr.com/>

It may be helpful to use a scaffold to get off the ground quickly
<https://github.com/facebook/create-react-app>
