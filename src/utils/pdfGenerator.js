import jsPDF from 'jspdf';
import { cvData } from '../data/mock';
import { getText, getTextArray } from './languageHelpers';

export const generatePDF = (language = 'en') => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  let yPos = margin;

  // Colors
  const primaryColor = [6, 182, 212]; // Cyan
  const textColor = [30, 41, 59]; // Dark slate
  const lightGray = [148, 163, 184]; // Slate gray

  // Helper functions
  const addText = (text, fontSize, color, isBold = false, maxWidth = null) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    if (maxWidth) {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, margin, yPos);
      yPos += (lines.length * fontSize * 0.4);
    } else {
      doc.text(text, margin, yPos);
      yPos += fontSize * 0.5;
    }
  };

  const addSpace = (space = 5) => {
    yPos += space;
  };

  const addLine = () => {
    doc.setDrawColor(...lightGray);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 5;
  };

  const checkPageBreak = (spaceNeeded = 30) => {
    if (yPos + spaceNeeded > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  // Header
  addText(cvData.personal.name, 24, primaryColor, true);
  addSpace(2);
  addText(getText(cvData.personal.title, language), 14, textColor, true);
  addSpace(2);
  addText(getText(cvData.personal.tagline, language), 10, lightGray);
  addSpace(3);

  // Contact Info
  doc.setFontSize(9);
  doc.setTextColor(...lightGray);
  const contactInfo = `${cvData.personal.email} | ${cvData.personal.phone} | ${getText(cvData.personal.location, language)}`;
  doc.text(contactInfo, margin, yPos);
  yPos += 8;

  addLine();
  addSpace(3);

  // Professional Summary
  const summaryTitle = language === 'en' ? 'Professional Summary' : 'Resumen Profesional';
  addText(summaryTitle, 14, primaryColor, true);
  addSpace(3);
  addText(getText(cvData.personal.summary, language), 9, textColor, false, pageWidth - 2 * margin);
  addSpace(5);

  // Experience
  const experienceTitle = language === 'en' ? 'Professional Experience' : 'Experiencia Profesional';
  checkPageBreak(40);
  addText(experienceTitle, 14, primaryColor, true);
  addSpace(3);

  cvData.experience.forEach((exp, index) => {
    checkPageBreak(50);
    
    // Company and Period
    addText(getText(exp.company, language), 11, textColor, true);
    addSpace(1);
    addText(getText(exp.position, language), 10, textColor, true);
    addSpace(1);
    doc.setFontSize(8);
    doc.setTextColor(...lightGray);
    doc.text(getText(exp.period, language), margin, yPos);
    yPos += 5;
    
    // Description
    addText(getText(exp.description, language), 9, textColor, false, pageWidth - 2 * margin);
    addSpace(2);
    
    // Technologies
    const techLabel = language === 'en' ? 'Technologies: ' : 'Tecnologías: ';
    doc.setFontSize(9);
    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'bold');
    doc.text(techLabel, margin, yPos);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...lightGray);
    const techText = getTextArray(exp.technologies, language).join(', ');
    const techLines = doc.splitTextToSize(techText, pageWidth - 2 * margin - 25);
    doc.text(techLines, margin + 25, yPos);
    yPos += (techLines.length * 3.5);
    addSpace(2);
    
    // Achievements
    const achieveLabel = language === 'en' ? 'Key Achievements:' : 'Logros Clave:';
    addText(achieveLabel, 9, textColor, true);
    
    exp.achievements.forEach((achievement) => {
      checkPageBreak(15);
      doc.setFontSize(9);
      doc.setTextColor(...textColor);
      doc.setFont('helvetica', 'normal');
      const achieveText = '• ' + getText(achievement, language);
      const achieveLines = doc.splitTextToSize(achieveText, pageWidth - 2 * margin - 5);
      doc.text(achieveLines, margin + 3, yPos);
      yPos += (achieveLines.length * 3.5);
    });
    
    if (index < cvData.experience.length - 1) {
      addSpace(5);
      doc.setDrawColor(...lightGray);
      doc.setLineWidth(0.3);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      addSpace(5);
    }
  });

  // Education
  checkPageBreak(40);
  addSpace(5);
  const educationTitle = language === 'en' ? 'Education & Certifications' : 'Educación y Certificaciones';
  addText(educationTitle, 14, primaryColor, true);
  addSpace(3);

  cvData.education.forEach((edu) => {
    checkPageBreak(20);
    addText(edu.degree, 10, textColor, true, pageWidth - 2 * margin);
    addSpace(1);
    doc.setFontSize(9);
    doc.setTextColor(...lightGray);
    doc.text(`${edu.institution} | ${edu.year}`, margin, yPos);
    yPos += 7;
  });

  // Skills
  checkPageBreak(40);
  addSpace(5);
  const skillsTitle = language === 'en' ? 'Technical Skills' : 'Habilidades Técnicas';
  addText(skillsTitle, 14, primaryColor, true);
  addSpace(3);

  const skillsList = cvData.skills.technical.map(s => s.name).join(' • ');
  addText(skillsList, 9, textColor, false, pageWidth - 2 * margin);

  // Languages
  addSpace(5);
  const languagesTitle = language === 'en' ? 'Languages' : 'Idiomas';
  addText(languagesTitle, 14, primaryColor, true);
  addSpace(3);

  cvData.languages.forEach((lang) => {
    const langName = getText(lang.name, language);
    const langLevel = lang.level === 'Native' 
      ? (language === 'en' ? 'Native' : 'Nativo')
      : (language === 'en' ? 'Professional Working Proficiency' : 'Competencia Profesional');
    
    doc.setFontSize(9);
    doc.setTextColor(...textColor);
    doc.setFont('helvetica', 'bold');
    doc.text(`${langName}: `, margin, yPos);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...lightGray);
    doc.text(langLevel, margin + 20, yPos);
    yPos += 5;
  });

  // Footer
  const footerY = pageHeight - 15;
  doc.setFontSize(8);
  doc.setTextColor(...lightGray);
  const footerText = language === 'en' 
    ? 'Business Intelligence Professional | Power BI Expert'
    : 'Profesional de Business Intelligence | Experto en Power BI';
  doc.text(footerText, pageWidth / 2, footerY, { align: 'center' });

  // Save PDF
  const fileName = language === 'en' 
    ? 'Jose_Manuel_Ortega_CV_English.pdf'
    : 'Jose_Manuel_Ortega_CV_Espanol.pdf';
  
  doc.save(fileName);
};
