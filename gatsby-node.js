const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const ProjectPage = path.resolve(`./src/templates/ProjectPage.js`)
  const WorkPage = path.resolve(`./src/templates/WorkPage.js`)

  return graphql(`
    {
      allContentfulProject {
        edges {
          node {
            slug
          }
        }
      }

      allContentfulTag {
        edges {
          node {
            name
            description {
              description
            }
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
        context: { ...node },
      })
    })

    const tags = result.data.allContentfulTag.edges
    tags.forEach(({ node }) => {
      createPage({
        path: `/work/${node.name}`,
        component: WorkPage,
        context: { ...node },
      })
    })

  })
}
