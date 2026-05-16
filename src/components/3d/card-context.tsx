"use client";

import React, { createContext, useContext, useState } from "react";
import type { Project } from "@/types";
import { PROJECTS } from "@/content/projects/projects";

type CardContextType = {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  projects: Project[];
  isModalOpen: boolean;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export function useCardContext() {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("useCardContext must be used within CardProvider");
  return ctx;
}

export function CardProvider({
  children,
  projects = PROJECTS,
}: {
  children: React.ReactNode;
  projects?: Project[];
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const isModalOpen = selectedProject !== null;

  return (
    <CardContext.Provider
      value={{ selectedProject, setSelectedProject, projects, isModalOpen }}
    >
      {children}
    </CardContext.Provider>
  );
}
