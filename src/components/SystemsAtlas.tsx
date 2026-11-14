import { useState } from 'react';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type AtlasNode = {
  id: string;
  label: string;
  detail: string;
  caseStudy?: {
    label: string;
    href: string;
  };
};

type AtlasRoute = {
  id: string;
  number: string;
  title: string;
  summary: string;
  color: 'platform' | 'delivery' | 'cloud' | 'observability';
  nodes: AtlasNode[];
};

const ATLAS_ROUTES: AtlasRoute[] = [
  {
    id: 'platform',
    number: '01',
    title: 'Platform Engineering',
    summary: 'A Backstage path from service catalog to reviewed infrastructure changes.',
    color: 'platform',
    nodes: [
      {
        id: 'backstage',
        label: 'Backstage IDP',
        detail: 'A Backstage portal brings a service catalog and self-service templates together.',
        caseStudy: { label: 'Backstage IDP case study', href: '/projects/backstage-idp' },
      },
      {
        id: 'catalog',
        label: 'Software Catalog',
        detail: 'Catalog entries give teams a shared place to describe software components and ownership.',
      },
      {
        id: 'scaffolder',
        label: 'Scaffolder Templates',
        detail: 'Form inputs and template steps assemble a repository from reusable project material.',
      },
      {
        id: 'terraform-modules',
        label: 'Terraform Modules',
        detail: 'Shared Terraform modules are pinned to Git tags so template output can use known versions.',
      },
      {
        id: 'github-actions',
        label: 'GitHub Actions',
        detail: 'Generated repositories can include workflow files alongside infrastructure configuration.',
      },
      {
        id: 'gitops-pr',
        label: 'GitOps PR',
        detail: 'The generated changes are proposed as a pull request for review before infrastructure is applied.',
      },
    ],
  },
  {
    id: 'delivery',
    number: '02',
    title: 'DevSecOps & Delivery',
    summary: 'The Local Guide Booking delivery path, from checks and scans to a container image.',
    color: 'delivery',
    nodes: [
      {
        id: 'local-guide-booking',
        label: 'Local Guide Booking',
        detail: 'A Flask booking application used to explore a tested, scanned, and GitOps-managed delivery flow.',
        caseStudy: { label: 'Local Guide Booking case study', href: '/projects/local-guide-booking' },
      },
      {
        id: 'jenkins',
        label: 'Jenkins',
        detail: 'Jenkins coordinates the project’s delivery pipeline and its quality and security checks.',
      },
      {
        id: 'cicd',
        label: 'CI / CD',
        detail: 'The pipeline links validation, image creation, and a GitOps update into one delivery sequence.',
      },
      {
        id: 'pytest',
        label: 'Pytest',
        detail: 'Pytest runs the application’s automated tests in the pipeline.',
      },
      {
        id: 'selenium',
        label: 'Selenium',
        detail: 'Selenium exercises end-to-end user journeys in a browser.',
      },
      {
        id: 'sonarqube',
        label: 'SonarQube',
        detail: 'The SonarQube quality gate can stop the pipeline when its quality conditions are not met.',
      },
      {
        id: 'trivy',
        label: 'Trivy',
        detail: 'Trivy scans the container image before the release continues.',
      },
      {
        id: 'docker',
        label: 'Docker',
        detail: 'A two-stage Docker build packages the application as a container image.',
      },
    ],
  },
  {
    id: 'cloud',
    number: '03',
    title: 'Cloud & Infrastructure',
    summary: 'Infrastructure building blocks explored through cloud templates and a K3s project.',
    color: 'cloud',
    nodes: [
      {
        id: 'aws',
        label: 'AWS',
        detail: 'AWS infrastructure appears in the Backstage templates and cloud cost project.',
      },
      {
        id: 'terraform',
        label: 'Terraform',
        detail: 'Terraform describes cloud infrastructure as version-controlled configuration.',
      },
      {
        id: 'ansible',
        label: 'Ansible',
        detail: 'Ansible automates setup steps in the Local Guide Booking deployment environment.',
      },
      {
        id: 'kubernetes',
        label: 'Kubernetes',
        detail: 'Kubernetes concepts are applied through the K3s cluster used by Local Guide Booking.',
      },
      {
        id: 'helm',
        label: 'Helm',
        detail: 'Helm packages and configures the application for deployment on K3s.',
      },
      {
        id: 'automation',
        label: 'Infrastructure Automation',
        detail: 'Reusable templates and configuration tools make infrastructure setup repeatable.',
      },
    ],
  },
  {
    id: 'observability',
    number: '04',
    title: 'Observability',
    summary: 'Application signals collected with Prometheus and explored in Grafana.',
    color: 'observability',
    nodes: [
      {
        id: 'prometheus',
        label: 'Prometheus',
        detail: 'Prometheus scrapes application metrics from the Local Guide Booking service.',
      },
      {
        id: 'metrics',
        label: 'Metrics',
        detail: 'The application exposes custom metrics for requests, latency, and booking activity.',
      },
      {
        id: 'monitoring',
        label: 'Monitoring',
        detail: 'Monitoring helps make service health and application behavior visible over time.',
      },
      {
        id: 'grafana',
        label: 'Grafana',
        detail: 'A Grafana dashboard presents the metrics collected for the application.',
      },
    ],
  },
];

type SelectedNode = {
  route: AtlasRoute;
  node: AtlasNode;
};

const routePath = (nodeCount: number) =>
  Array.from({ length: nodeCount }, (_, index) => {
    const x = (index / (nodeCount - 1)) * 1000;
    return `${index === 0 ? 'M' : 'L'} ${x} 18`;
  }).join(' ');

export const SystemsAtlas = () => {
  const [highlightedRoute, setHighlightedRoute] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);

  const selectRoute = (route: AtlasRoute) => {
    setHighlightedRoute((current) => (current === route.id ? null : route.id));
    setSelectedNode(null);
  };

  const selectNode = (route: AtlasRoute, node: AtlasNode) => {
    setHighlightedRoute(route.id);
    setSelectedNode({ route, node });
  };

  const resetAtlas = () => {
    setHighlightedRoute(null);
    setSelectedNode(null);
  };

  return (
    <section id="atlas" className="atlas-section" aria-labelledby="atlas-heading">
      <div className="atlas-shell">
        <header className="atlas-section-heading">
          <div>
            <p className="atlas-kicker">A working map of connected ideas</p>
            <h2 id="atlas-heading" className="atlas-section-title">Systems Atlas</h2>
            <p className="atlas-section-intro">
              Four routes through the tools, decisions, and project systems I’m learning to build.
            </p>
          </div>
          <Button type="button" variant="outline" className="atlas-reset" onClick={resetAtlas}>
            <RotateCcw aria-hidden="true" />
            Show all routes
          </Button>
        </header>

        <div className="atlas-map" aria-label="Interactive map of four engineering routes">
          {ATLAS_ROUTES.map((route) => {
            const isDimmed = highlightedRoute !== null && highlightedRoute !== route.id;
            const isHighlighted = highlightedRoute === route.id;

            return (
              <section
                key={route.id}
                className={`atlas-route atlas-route--${route.color}`}
                data-dimmed={isDimmed}
                data-highlighted={isHighlighted}
                onMouseEnter={() => setHighlightedRoute(route.id)}
                onMouseLeave={() => setHighlightedRoute(null)}
                onFocus={() => setHighlightedRoute(route.id)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setHighlightedRoute(null);
                  }
                }}
              >
                <div className="atlas-route-heading">
                  <span className="atlas-route-number">{route.number}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    className="atlas-route-title"
                    aria-pressed={isHighlighted}
                    onClick={() => selectRoute(route)}
                  >
                    {route.title}
                  </Button>
                  <p>{route.summary}</p>
                </div>

                <div className="atlas-route-track">
                  <svg className="atlas-route-svg" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
                    <path className="atlas-route-path" d={routePath(route.nodes.length)} />
                  </svg>
                  <div
                    className="atlas-node-grid"
                    style={{ gridTemplateColumns: `repeat(${route.nodes.length}, minmax(0, 1fr))` }}
                  >
                    {route.nodes.map((node) => {
                      const isSelected = selectedNode?.node.id === node.id;

                      return (
                        <Button
                          key={node.id}
                          type="button"
                          variant="ghost"
                          className="atlas-node"
                          aria-label={`${node.label}${node.caseStudy ? ', project case study' : ''}`}
                          aria-pressed={isSelected}
                          onClick={() => selectNode(route, node)}
                        >
                          <span className="atlas-node-marker" aria-hidden="true" />
                          <span className="atlas-node-label">{node.label}</span>
                          {node.caseStudy && <span className="atlas-node-type">Case study</span>}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <ol className="atlas-mobile-route" aria-label={`${route.title} route nodes`}>
                  {route.nodes.map((node) => (
                    <li key={node.id}>
                      <Button
                        type="button"
                        variant="ghost"
                        className="atlas-mobile-node"
                        aria-pressed={selectedNode?.node.id === node.id}
                        onClick={() => selectNode(route, node)}
                      >
                        <span className="atlas-node-marker" aria-hidden="true" />
                        <span>{node.label}</span>
                        {node.caseStudy && <span className="atlas-node-type">Case study</span>}
                      </Button>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>

        <div className="atlas-selection" aria-live="polite" aria-atomic="true">
          {selectedNode ? (
            <div className="atlas-selection-content">
              <div>
                <p className="atlas-kicker">
                  {selectedNode.route.number} / {selectedNode.route.title}
                </p>
                <h3>{selectedNode.node.label}</h3>
                <p>{selectedNode.node.detail}</p>
              </div>
              {selectedNode.node.caseStudy && (
                <Button asChild variant="outline" className="atlas-case-study-link">
                  <Link to={selectedNode.node.caseStudy.href}>
                    {selectedNode.node.caseStudy.label}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <p className="atlas-selection-prompt">Select a point to read its field note.</p>
          )}
        </div>

        <footer className="atlas-map-footer">
          <span>FIELD MAP / 04 ROUTES</span>
          <span>PLATFORM · DELIVERY · CLOUD · OBSERVABILITY</span>
        </footer>
      </div>
    </section>
  );
};