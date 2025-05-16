
import React from 'react';
import PageHeader from "@/components/PageHeader";

interface HeaderSectionProps {
  title: string;
  description: string;
  imageUrl: string;
}

const HeaderSection = ({ title, description, imageUrl }: HeaderSectionProps) => {
  return (
    <PageHeader
      title={title}
      description={description}
      imageUrl={imageUrl}
      className="pb-16"
    />
  );
};

export default HeaderSection;
