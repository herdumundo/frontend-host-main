import styled from '@emotion/styled';
import Box from '@mui/material/Box';

export default styled(Box)({
  zIndex: 120,
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.5)',
  backdropFilter: 'blur(16px) contrast(1.05) brightness(1.1) saturate(1.5)',
  overflow: 'hidden',
  flexDirection: 'column',
  margin: 0,
  textAlign: 'left',
  color: '#65738c',
  boxSizing: 'border-box',
  width: '100%',
  padding: '0rem 0rem 1rem 0',
  boxShadow: '#919eab4d 0 0 2px,#919eab1f 0 12px 24px -4px !important'
});
