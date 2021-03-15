import { useContext, useState, useEffect } from "react";
import { Github } from "../context/GithubContext";
import { initOAuth, getRepos } from "../clients/github";
import { Card, Col, Row } from "antd";

const GithubPage = () => {
  const { user, github, setRepoFav } = useContext(Github);
  const [repos, setRepos] = useState([]);
  const [called, setCalled] = useState(false);
  const [reposFav, setReposFav] = useState([]);

  useEffect(() => {
    if (github && github.login && !called) {
      const call = async () => {
        const respos = await getRepos(github.token, github.url);
        setRepos(respos);
        setCalled(true);
      };
      call();
    }

    if (github && Array.isArray(github.favoritos)) {
      setRepos(
        repos.map((repo) => {
          return {
            ...repo,
            __fav: github.favoritos.some((e) => e === repo.id),
          };
        })
      );
    }
  }, [github, called]);

  const myRepos = repos.map((repo, index) => {
    return (
      <Col
        span={8}
        key={index}
        className="gutter-row"
        style={{ marginBottom: "10px" }}
      >
        <Card title={repo.name} bordered={false}>
          <div>{repo.url}</div>
          {!repo.__fav ? (
            <div>
              <button onClick={() => setRepoFav(repo.id)}>⭐</button>
            </div>
          ) : null}
        </Card>
      </Col>
    );
  });

  const myReposFav = repos
    .filter((e) => e.__fav)
    .map((repo, index) => {
      return (
        <div key={"repo" + index}>
          <div>Nombre: {repo.name}</div>
        </div>
      );
    });

  return (
    <div style={{ padding: "10px" }}>
      <h3>Github</h3>
      {user && user._extraData && !user._extraData.github ? (
        <button onClick={initOAuth}>Vincular con Github</button>
      ) : null}
      {github ? (
        <div>
          <div>User: {github.login}</div>
          <hr />
          <h3>Mis repositorios favoritos</h3>
          {repos && repos.length ? myReposFav : "Sin repositorios favoritos"}
          <hr />
          <h3>Repositorios</h3>
          {repos && repos.length ? (
            <div className="site-card-wrapper" style={{ padding: "10px" }}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>{myRepos}</Row>
            </div>
          ) : (
            "Sin repositorios"
          )}
        </div>
      ) : null}
    </div>
  );
};
export default GithubPage;
