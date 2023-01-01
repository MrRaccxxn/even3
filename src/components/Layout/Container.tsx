import React from 'react';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="container mx-auto flex px-5 flex-col md:flex-row items-center">
      {children}
    </section>
  );
};

export const ContainerX = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flow-root w-full max-w-6xl md:w-full mx-auto flex-col justify-between"> {children}</div>
  )
}

