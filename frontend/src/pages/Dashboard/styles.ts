import styled from 'styled-components';

export const Container = styled.div`
  background: #87ceeb;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;
`;

export const Table = styled.div`
  margin-top: 1rem;
  width: auto;
  justify-content: center;
  background-color: var(--background);
  height: 100%;
  table {
    justify-content: center;
    align-items: center;
    display: flex;
    border-spacing: 0 0.5rem;

    th {
      padding: 1rem 2rem;
      font-weight: 400;
      line-height: 1.5rem;
      text-align: left;
      color: balck;
      background: #006ba1;
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

      &:first-child {
        border-radius: 0.25rem 0 0 0.25rem;
      }
      &:last-child {
        border-radius: 0 0.25rem 0.25rem 0;
      }
    }

    td {
      padding: 1rem 2rem;
      color: var(--text-body);
      background: var(--shape);
      border: 0;
      cursor: pointer;

      &:first-child {
        color: var(--text-title);
        border-radius: 0.25rem 0 0 0.25rem;
      }
      &:last-child {
        border-radius: 0 0.25rem 0.25rem 0;
      }
    }
    td.title {
      transition: filter 0.2s ease-in-out;
    }
    td.title:hover {
      filter: brightness(0.9);
    }
    button {
      padding: 1rem 2rem;
      color: var(--text-body);
      background: var(--shape);
      border: 0;
      cursor: pointer;
      margin-left: 10px;

      &:first-child {
        color: var(--text-title);
        border-radius: 0.25rem 0 0 0.25rem;
      }
      &:last-child {
        border-radius: 0 0.25rem 0.25rem 0;
      }
      svg {
        color: #3d3d4d;
      }
      & + button {
        margin-left: 6px;
      }
    }
  }
`;
