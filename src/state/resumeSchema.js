let nextId = 1;
export function uid() {
  return `row-${Date.now()}-${nextId++}`;
}

export function createEmptyResume(templateId) {
  return {
    id: uid(),
    templateId,
    meta: {
      label: '',
      targetRole: '',
      jobDescriptionTag: '',
      savedAt: null,
    },
    personal: {
      name: '',
      title: '',
      phone: '',
      email: '',
      location: '',
      linkedin: '',
      website: '',
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: [],
  };
}

export function createEmptyEducation() {
  return { id: uid(), degree: '', institution: '', location: '', year: '' };
}

export function createEmptyExperience() {
  return { id: uid(), title: '', employer: '', location: '', start: '', end: '', bullets: [''] };
}

export function createEmptyProject() {
  return { id: uid(), title: '', skills: '', start: '', end: '', bullets: [''] };
}

export function createEmptySkillGroup() {
  return { id: uid(), category: '', items: '' };
}

export function createPlaceholderResume(templateId) {
  const resume = createEmptyResume(templateId);
  resume.meta.label = 'Placeholder';
  resume.personal = {
    name: 'Name Surname',
    title: '',
    phone: '012 345 6789',
    email: 'yourname@gmail.com',
    location: '',
    linkedin: 'LinkedIn',
    website: 'Website',
  };
  resume.summary =
    'Your professional summary is your elevator pitch. This is a concise and compelling 2-3 sentence overview of your experience, expertise, personality, and standout features, tailored to the role.';
  resume.education = [
    { id: uid(), degree: 'Degree', institution: 'Institution', location: 'Location', year: 'Year Completed' },
    { id: uid(), degree: 'Degree', institution: 'Institution', location: 'Location', year: 'Year Completed' },
  ];
  resume.experience = [
    {
      id: uid(),
      title: 'Position Title',
      employer: 'Employer',
      location: 'Location',
      start: 'Mmm YYYY',
      end: 'Present',
      bullets: [
        'List your jobs in reverse chronological order, focus on the last 5-10 years or the last 3-4 roles',
        'Aim for 3-5 bullets per role and start with action verbs to describe your responsibilities and achievements',
        'Quantify your accomplishments where possible to give concrete evidence of your impact',
      ],
    },
  ];
  resume.projects = [
    {
      id: uid(),
      title: 'Project Title',
      skills: 'Skills Used',
      start: 'Mmm YYYY',
      end: 'Mmm YYYY',
      bullets: [
        'Summarize the project, focusing on the problem solved, your approach, and the outcome achieved',
        'Highlight results like increased efficiency or user engagement, providing specific numbers where relevant',
      ],
    },
  ];
  resume.skills = [
    { id: uid(), category: 'Languages', items: 'Python, JavaScript, Java, C/C++, SQL, Ruby, R' },
    { id: uid(), category: 'Frameworks', items: 'React, Django, Spring Boot, Flask, Angular, Ruby on Rails, Express.js' },
    { id: uid(), category: 'Developer Tools', items: 'Git, Docker, Jenkins, Visual Studio Code, PyCharm, TravisCI, Eclipse, JIRA' },
  ];
  return resume;
}
