import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <footer
      className="bg-dark text-white pt-4 pb-2 mt-5"
      style={{ borderTop: "5px solid #bc5f18ff" }}
    >
      <Container>
        <Row>
          <Col md={4}>
            <h5 style={{ color: "#bc5f18ff" }} className="fw-bold">
              Food Court
            </h5>
            <p>Delicious food delivered with love</p>
          </Col>
          <Col md={4}>
            <ul className="list-unstyled d-flex gap-5 me-5">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <li>Home</li>
              </Link>
              <Link
                to="/menu"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li>Menu</li>
              </Link>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li>About</li>
              </Link>
              <Link
                to="/contact"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li>Contact</li>
              </Link>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us On</h5>
            <p>Facebook | Instagram | Twitter</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            &copy; {new Date().getFullYear()}{" "}
            <span style={{ color: "#bc5f18ff" }}>Food Court</span>. All rights
            reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
