import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type }) => {
  return (
    <Helmet>
      { /* Standard metadata tags */ }
      <title>{title ? `${title} | SyncSetu` : 'SyncSetu'}</title>
      <meta name='description' content={description || "SyncSetu - WhatsApp-Integrated Micro-CRM for India's Small Businesses"} />
      
      { /* Facebook tags */ }
      <meta property="og:type" content={type || "website"} />
      <meta property="og:title" content={title ? `${title} | SyncSetu` : 'SyncSetu'} />
      <meta property="og:description" content={description || "SyncSetu - WhatsApp-Integrated Micro-CRM"} />
      
      { /* Twitter tags */ }
      <meta name="twitter:creator" content={name || "SyncSetu"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | SyncSetu` : 'SyncSetu'} />
      <meta name="twitter:description" content={description || "SyncSetu - WhatsApp-Integrated Micro-CRM"} />
    </Helmet>
  );
};

export default SEO;
