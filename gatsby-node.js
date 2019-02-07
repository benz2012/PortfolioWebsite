const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const ProjectPage = path.resolve(`./src/templates/ProjectPage.js`)
  return graphql(`
    {
      allContentfulProject {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then((result) => {
    const projects = result.data.allContentfulProject.edges
    projects.forEach(({ node }) => {
      createPage({
        path: `/projects/${node.slug}/`,
        component: ProjectPage,
        context: {
          slug: node.slug,
        }
      })
    })
  })
}
