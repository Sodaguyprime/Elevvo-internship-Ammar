import { createContext, useContext, useState } from "react";
import mockData from "../data/MockData.json";

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(mockData.projects);

  const addProject = (project) => {
    setProjects((prev) => [project, ...prev]);
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectsContext);
}
