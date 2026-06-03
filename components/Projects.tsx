'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ProjectCard from './ProjectCard'

const projects = [
  {
    title: 'Ocean Cabinet Business Website',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Form Integration'],
    description:
      'Built and deployed a responsive business website for a local cabinet and countertop company. The site focuses on mobile usability, clear service pages, customer conversion, and free estimate requests.',
    highlights: [
      'Designed a modern landing page for kitchen, bath, countertop, and flooring services',
      'Built responsive layouts for desktop and mobile users',
      'Integrated contact and appointment form functionality',
      'Improved calls-to-action for local business lead generation',
    ],
    buttons: [
      { label: 'Live Demo', href: '#', icon: 'external' as const },
      { label: 'GitHub', href: '#', icon: 'github' as const },
    ],
  },
  {
    title: 'Restaurant Order Analytics Dashboard',
    techStack: ['Python', 'pandas', 'SQL', 'Data Visualization'],
    description:
      'Created a data analysis dashboard using simulated restaurant order data to identify sales trends, peak hours, popular menu items, and revenue patterns.',
    highlights: [
      'Cleaned and analyzed order data using Python and pandas',
      'Wrote SQL queries to summarize sales and menu performance',
      'Visualized daily revenue, top-selling items, and busy time periods',
      'Designed metrics based on real restaurant operation experience',
    ],
    buttons: [
      { label: 'GitHub', href: '#', icon: 'github' as const },
      { label: 'View Details', href: '#', icon: 'external' as const },
    ],
    badge: 'In Progress',
  },
  {
    title: 'Digital Image Processing Toolkit',
    techStack: ['Python', 'OpenCV', 'NumPy', 'Image Processing'],
    description:
      'Implemented image enhancement and analysis techniques including filtering, noise removal, histogram equalization, edge detection, and contrast improvement.',
    highlights: [
      'Applied Roberts, Prewitt, and Sobel edge detection methods',
      'Implemented noise reduction using median and mean filters',
      'Compared image quality using contrast and visibility metrics',
      'Processed grayscale, HSV, and RGB image channels',
    ],
    buttons: [
      { label: 'GitHub', href: '#', icon: 'github' as const },
      { label: 'View Details', href: '#', icon: 'external' as const },
    ],
  },
  {
    title: 'ROS2 Odometry Logger',
    techStack: ['Python', 'ROS2', 'Robotics', 'Data Logging'],
    description:
      'Built a ROS2 node to record robot odometry data and export movement information for analysis.',
    highlights: [
      'Subscribed to robot odometry topics and logged position data',
      'Exported movement data to CSV for visualization',
      'Tested navigation behavior under different costmap settings',
      'Used Python scripting to support robotics experiments',
    ],
    buttons: [
      { label: 'GitHub', href: '#', icon: 'github' as const },
      { label: 'View Details', href: '#', icon: 'external' as const },
    ],
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-medium text-accent-cyan uppercase tracking-widest mb-3">
            Projects
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-12">
            What I&apos;ve built
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
