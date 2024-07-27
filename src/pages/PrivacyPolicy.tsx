import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <Box py={8}>
        <Container maxWidth='md'>
          <Box>
            <Typography
              component='a'
              href='/#'
              variant='h4'
              color='inherit'
              textAlign='center'
              display='block'
              sx={{ textDecoration: "none" }}
            >
              QuikNotes
            </Typography>
            <Typography variant='body2' textAlign='center'>
              please read our privacy policy carefully and understand
            </Typography>
          </Box>
          <Box my={4}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h5' mb={2}>
                  Privacy Policy
                </Typography>
                <Box mb={2}>
                  <Typography variant='body1' mb={1}>
                    Documents Document Confidentiality
                  </Typography>
                  <Typography variant='body2'>
                    We treat all documents with the utmost confidentiality. Any information contained within documents
                    provided to us is considered private and will be protected from unauthorized access, use, or
                    disclosure.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant='body1' mb={1}>
                    Data Collection and Usage
                  </Typography>
                  <Typography variant='body2'>
                    We may collect basic document metadata (e.g., file name, size, date created) for internal use, such
                    as tracking document flow and storage management. This information is not shared with third parties.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant='body1' mb={1}>
                    Document Security
                  </Typography>
                  <Typography variant='body2'>
                    We employ robust security measures to safeguard your documents, including: Encryption: Sensitive
                    documents are encrypted both at rest and in transit. Access Control: Only authorized personnel have
                    access to documents. Regular Audits: Our systems are regularly monitored for security
                    vulnerabilities. Incident Response: We have procedures in place to handle any potential security
                    breaches.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant='body1' mb={1}>
                    Data Retention
                  </Typography>
                  <Typography variant='body2'>
                    We retain documents for a reasonable period based on legal and business requirements. After this
                    period, documents may be securely deleted or anonymized.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant='body1' mb={1}>
                    Third-Party Sharing
                  </Typography>
                  <Typography variant='body2'>
                    We do not share document content with third parties unless required by law or with explicit consent
                    from the document owner.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant='body1' mb={1}>
                    Your Rights
                  </Typography>
                  <Typography variant='body2'>
                    You have the right to access, correct, or delete your documents. To exercise these rights, please
                    contact us at support@quiknote.com
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant='body1' mb={1}>
                    Changes to this Policy
                  </Typography>
                  <Typography variant='body2'>
                    We reserve the right to modify this privacy policy. Any changes will be posted on our website.
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant='body1' mb={1}>
                    Disclaimer
                  </Typography>
                  <Typography variant='body2'>
                    While we strive to protect your documents, we cannot guarantee absolute security. By providing
                    documents, you acknowledge and accept these risks.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
