## Favorites Database

Your Render (or alternative server) link e.g. http://a3-joshua-cuneo.render.me

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:


In this website, users can keep track of what their favorite things are, and easily change them on the fly. The goal is for the user to have a site they can use to keep track of their favorites that they can access from anywhere. A challenge I faced when trying to realize the website was properly implementing Handlebars. For authentication, users will simply enter a username and password to ensure their account exist. An account is created if one does not already exist. I chose to do this because it was the simplest to implement. I used Pure CSS because it looked the cleanest to me. I made no edits to the CSS, just added on top of it. For Express, I used .use for making sure my server implemented handlebars and json properly. I used .set and .engine to properly ensure Handlebar use. I used .get and .post to get and post data respectively. Finally, I used .listen to use the server on the correct port.

## Technical Achievements
- **Tech Achievement 1**: I achieved 100 on all Ligthouse tests*
- **Tech Achievement 2**: I hosted my site on 
- **Tech Achievement 3**: I used Handlebars to show messages for the login page

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative. Listed are the 12 I followed:
1. Keep content clear and concise
2. Provide informative, unique page titles
3. Use headings to convey meaning and structure
4. Provide sufficient contrast between foreground and background
5. Ensure that interactive elements are easy to identify
6. Ensure that form elements include clearly associated labels
7. Provide easily identifiable feedback
8. Associate a label with every form control
9. Identify page language and language changes
10. Reflect the reading order in the code order
11. Write code that adapts to the user’s technology
12. Ensure that all interactive elements are keyboard accessible

AI Usage:
I used ChatGPT for minor bug fixes, such as typos in my code and helping me identify incorrect JSON usage.

*For the Lighthouse, I keep getting an error that says I do not have the HTML lang element on my pages when I do. I do not what is causing this bug. Earlier in the process, I had gotten 100 on Lighthouse and it suddenly changed. On the Web Dev tips, the lang attribute is visable.