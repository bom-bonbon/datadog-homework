import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import RepoTable from './RepoTable';
import { makeQueryAPICall, ITEMS_PER_PAGE } from './DataManager';

const MAX_RESPONSE_COUNT = 1000;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const onSubmit = () => {
    setQuery(document.getElementById('searchText').value);
    setCurrentPage(1);
    makeQueryAPICall(1, setData, setErrorMsg);
  };

  const onClickPrev = () => {
    const targetPage = currentPage - 1;
    makeQueryAPICall(targetPage, setData, setErrorMsg);
    setCurrentPage(targetPage);
  };

  const onClickNext = () => {
    const targetPage = currentPage + 1;
    makeQueryAPICall(targetPage, setData, setErrorMsg);
    setCurrentPage(targetPage);
  };

  const isNextDisabled = () => {
    if (query == null || data?.total_count == null) {
      return true;
    }
    if (data.total_count > MAX_RESPONSE_COUNT) {
      return currentPage >= MAX_RESPONSE_COUNT / ITEMS_PER_PAGE;
    }
    return Math.ceil(currentPage >= data.total_count / ITEMS_PER_PAGE);
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Github Repository List</Card.Title>
        </Card.Body>
      </Card>
      <br />
      <>
        <Form.Control
          type="text"
          id="searchText"
          aria-describedby="passwordHelpBlock"
        />
        <Button variant="primary" onClick={onSubmit}>Submit</Button>
        <Button variant="primary" onClick={onClickPrev} disabled={query == null || currentPage === 1}>prev</Button>
        <Button variant="primary" onClick={onClickNext} disabled={isNextDisabled()}>next</Button>
      </>
      <br />
      {errorMsg == null ? <RepoTable items={data?.items} /> : <Alert variant="danger">{errorMsg}</Alert>}
    </Container>
  );
}