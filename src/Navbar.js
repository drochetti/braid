import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import icon from './icon.svg';

const Navbar = ({ name, projects, onLogout }) => (
  <nav className="navbar is-transparent" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/projects">
        <img width="16px" src={icon} alt="Braid logo" />
        <h1
          className="title has-text-weight-medium is-uppercase is-size-5"
          style={{ marginLeft: '.6rem' }}
        >
          Braid
        </h1>
      </Link>

      <a
        role="button"
        className="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">
            <Switch>
              <Route
                path="/projects/:id"
                render={props => (
                  <span>
                    {projects.reduce(
                      (acc, prj) =>
                        prj.projectId === Number(props.match.params.id)
                          ? prj.projectName
                          : acc,
                      'Select project'
                    )}
                  </span>
                )}
              />
              <Route render={() => <span>Select project</span>} />
            </Switch>
          </a>

          <div className="navbar-dropdown is-boxed">
            {projects.map(({ projectId, projectName }) => (
              <Link
                key={projectId}
                className="navbar-item"
                to={{
                  pathname: `/projects/${projectId}`,
                  state: { id: projectId }
                }}
              >
                {projectName}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <a className="navbar-item" href="https://github.com/jobn/braid">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <div className="navbar-item has-text-grey is-size-7">
          <span className="has-text-weight-light">Signed in as&nbsp;</span>
          <span className="has-text-weight-medium">{name}</span>
        </div>
        <div className="navbar-item">
          <button className="button is-small" onClick={onLogout}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export { Navbar };
