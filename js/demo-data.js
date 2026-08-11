const demoData = {
  users: [
    {
      id: 1,
      fullName: 'UWASE GRATIEN',
      username: 'uwaseg',
      email: 'uwase@nexxaa.com',
      phone: '+250788000111',
      location: 'Kigali, Rwanda',
      skills: ['HTML', 'CSS', 'JavaScript'],
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      fullName: 'MUGISHA ERIC',
      username: 'ericm',
      email: 'eric@nexxaa.com',
      phone: '+250788000222',
      location: 'Huye, Rwanda',
      skills: ['React', 'Node.js', 'MySQL'],
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    }
  ],
  courses: [
    {
      id: 1,
      title: 'Full Stack Web Development',
      description: 'Hands-on training for building modern web apps.',
      instructor: 'Aline Mukamana',
      category: 'Web Development',
      duration: '8 weeks',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 2,
      title: 'UI/UX Design Essentials',
      description: 'Learn principles, prototyping and accessibility.',
      instructor: 'Grace Uwase',
      category: 'Design',
      duration: '4 weeks',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80'
    }
  ],
  certificates: [
    {
      id: 1,
      certificateId: 'NEXXAA-2026-00001',
      verificationCode: 'VER-2026-00001',
      studentId: 1,
      courseId: 1,
      score: 95,
      issuedDate: 'August 2026',
      status: 'Valid Certificate'
    },
    {
      id: 2,
      certificateId: 'NEXXAA-2026-00002',
      verificationCode: 'VER-2026-00002',
      studentId: 2,
      courseId: 2,
      score: 91,
      issuedDate: 'August 2026',
      status: 'Valid Certificate'
    }
  ],
  projects: [
    {
      id: 1,
      title: 'Digital Learning Platform',
      description: 'A modern platform for interactive learning experiences.',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 2,
      title: 'Talent Matching Portal',
      description: 'A smart portal that connects learners with opportunities.',
      category: 'Talent',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80'
    }
  ],
  teamMembers: [
    {
      name: 'Aline Mukamana',
      role: 'Founder & CEO',
      bio: 'Leads strategy, partnerships, and innovation growth.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Eric Ndayisaba',
      role: 'Head of Training',
      bio: 'Builds practical learning programs for modern careers.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Grace Uwase',
      role: 'Product Designer',
      bio: 'Designs intuitive digital experiences with accessibility in mind.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
    }
  ],
  testimonials: [
    {
      quote: 'NEXXAA helped our team turn ideas into a polished digital experience.',
      author: 'Aline, Founder'
    },
    {
      quote: 'The training sessions gave me the confidence to grow into a full-stack developer.',
      author: 'Eric, Student'
    },
    {
      quote: 'Their support made our community program more impactful and well structured.',
      author: 'Donatien, Partner'
    }
  ]
};

if (!localStorage.getItem('nexxaaDemoData')) {
  localStorage.setItem('nexxaaDemoData', JSON.stringify(demoData));
}
