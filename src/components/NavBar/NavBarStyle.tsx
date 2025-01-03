import styled from 'styled-components';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FaceIcon from '@mui/icons-material/Face';

export const StyLoginIcon = styled(FaceIcon)`
  font-size: 18px;
`;

export const StyLogoutIcon = styled(ExitToAppIcon)`
  font-size: 18px;
`;

export const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20px;
  &:hover {
    color: #95e5f0;
  }
`;
