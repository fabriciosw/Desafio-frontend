import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { logoutUser } from '../../services/session.service';
import Text from '../Text';
import './styles.scss';

const Header: React.FunctionComponent = () => (
  <header className="shadow-sm">
    <nav className="nav">
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className="nav__grid-items d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="nav__toggle">
                  <HiOutlineMenuAlt3
                    size={25}
                    aria-label="Abrir/Fechar"
                    aria-describedby="Abrir/Fechar menu lateral"
                    data-cy="test-toggleMenu"
                  />
                </div>
                <div className="nav__title">
                  <Text as="h2" ariaLabel="Portal administrador">
                    Portal dos colaboradores
                  </Text>
                </div>
              </div>
              <Button
                className="logout"
                variant="contained"
                onClick={() => logoutUser()}
                color="error"
                startIcon={<LogoutIcon fontSize="large" />}
              >
                Logout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </nav>
  </header>
);

export default Header;
