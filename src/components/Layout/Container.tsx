import React from 'react';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="container mx-auto flex px-5 flex-col md:flex-row items-center">
      {children}
    </section>
  );
};
