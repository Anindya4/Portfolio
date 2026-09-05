import React from 'react';
import {
  Activity,
  Bot,
  Video,
  Terminal,
  Layers,
  Code2,
  Lock,
  Sparkles,
  FolderGit2,
  CheckCircle2,
  Users,
  GitPullRequest,
  Play,
  Database,
  Cpu,
  ArrowRight,
  Radio,
  Workflow,
} from 'lucide-react';
import { Project, PROJECTS_DATA } from '../data/portfolioData';

// Helper to calculate progress percentage for gauges
const getProgressWidth = (val?: string): string => {
  if (!val) return '88%';
  if (val.includes('%')) {
    const num = parseFloat(val);
    return isNaN(num) ? '88%' : `${Math.min(Math.max(num, 15), 100)}%`;
  }
  const num = parseFloat(val);
  if (!isNaN(num)) {
    if (num <= 1 && num > 0) {
      return `${Math.round(num * 100)}%`;
    }
    if (num <= 100 && num > 1) {
      return `${Math.round(num)}%`;
    }
  }
  return '90%';
};

// =========================================================================
// 1. CV + NLP: Computer Vision Detection & Tracking HUD
// =========================================================================
export const VisionMock: React.FC<{ project: Project }> = ({ project }) => {
  const isFootball =
    project.id.toLowerCase().includes('football') ||
    project.title.toLowerCase().includes('football');

  const primaryTag = project.tags[1] || project.tags[0] || 'YOLOv5';
  const speedMetric =
    project.metrics?.find((m) =>
      /fps|speed|latenc|stream|time/i.test(m.label)
    )?.value ||
    project.metrics?.[1]?.value ||
    '32.4 FPS • CUDA';

  // Box 1
  const box1Title = isFootball
    ? 'Player #08 [Team A]'
    : project.deliverables?.[0] || 'Primary Detection Object';
  const box1Sub = isFootball
    ? 'conf: 0.984 • speed: 21km/h'
    : `conf: ${project.metrics?.[0]?.value || '0.984'} • state: tracking`;

  // Box 2
  const box2Title = isFootball
    ? 'Ball [Possession: Team A]'
    : project.deliverables?.[1] || 'Detection Boundary';
  const box2Sub = isFootball
    ? 'coord: (104.2, 45.8)'
    : `${project.metrics?.[1]?.label || 'Coord'}: ${project.metrics?.[1]?.value || 'Active'}`;

  // Box 3
  const box3Title = isFootball
    ? 'Player #04 [Team B]'
    : project.deliverables?.[2] || 'Classifier Output';
  const box3Sub = isFootball
    ? 'conf: 0.971 • K-Means: #2'
    : `conf: ${project.metrics?.[2]?.value || '0.965'} • class: #2`;

  return (
    <div className="w-full h-full rounded-xl bg-zinc-950/80 border border-white/10 p-3 sm:p-3.5 flex flex-col justify-between text-xs font-mono select-none overflow-hidden">
      {/* Titlebar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[11px] text-zinc-500">
        <div className="flex items-center gap-1.5 truncate">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
            style={{ backgroundColor: project.accentColor || '#10b981' }}
          />
          <span className="text-zinc-300 font-sans font-medium truncate">
            {primaryTag} &bull; {project.title}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-400 text-[10px] shrink-0 ml-2 whitespace-nowrap">
          {speedMetric}
        </span>
      </div>

      {/* Visual Viewport with Bounding Boxes */}
      <div className="relative my-2 h-28 sm:h-32 bg-[#0c1214] rounded-lg border border-white/5 p-2.5 flex flex-col justify-between overflow-hidden">
        {/* Tactical pitch markings or HUD reticle */}
        {isFootball ? (
          <>
            <div className="absolute inset-0 opacity-15 border border-dashed border-emerald-400/40 m-2 rounded pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-emerald-400/20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-1/2 border-r border-emerald-400/20 pointer-events-none" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-15 border border-white/20 m-2 rounded pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-dashed border-white/20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40 pointer-events-none" />
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30 pointer-events-none" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30 pointer-events-none" />
          </>
        )}

        {/* Bounding Box 1 */}
        <div
          className="absolute top-3 left-4 border rounded p-1 text-[9px] shadow-sm max-w-[170px] truncate"
          style={{
            borderColor: project.accentColor || '#10b981',
            backgroundColor: `${project.accentColor || '#10b981'}1f`,
          }}
        >
          <span
            className="font-bold block truncate"
            style={{ color: project.accentColor || '#34d399' }}
          >
            {box1Title}
          </span>
          <span className="text-zinc-400 text-[8px] truncate block">
            {box1Sub}
          </span>
        </div>

        {/* Bounding Box 2 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 border border-amber-400/70 bg-amber-500/15 rounded p-1 text-[9px] max-w-[170px] truncate">
          <span className="text-amber-200 font-bold block truncate">
            {box2Title}
          </span>
          <span className="text-amber-300/80 text-[8px] truncate block">
            {box2Sub}
          </span>
        </div>

        {/* Bounding Box 3 */}
        <div className="absolute top-4 right-4 border border-sky-400/70 bg-sky-500/15 rounded p-1 text-[9px] max-w-[160px] truncate hidden sm:block">
          <span className="text-sky-300 font-bold block truncate">
            {box3Title}
          </span>
          <span className="text-sky-400/80 text-[8px] truncate block">
            {box3Sub}
          </span>
        </div>
      </div>

      {/* Sub-HUD Status */}
      <div className="z-10 flex items-center justify-between text-[10px] text-zinc-400 bg-black/60 px-2 py-1 rounded backdrop-blur-sm mt-auto border border-white/5">
        <span className="flex items-center gap-1 truncate">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: project.accentColor || '#10b981' }}
          />
          <span className="truncate">
            {project.deliverables?.[3] || `${project.tags.slice(0, 2).join(' + ')} Signature`}
          </span>
        </span>
        <span className="text-zinc-300 shrink-0 ml-2">
          {project.metrics?.[2]?.value
            ? `${project.metrics[2].label}: ${project.metrics[2].value}`
            : 'Inference Active'}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1.5 border-t border-white/5">
        <span className="truncate">{project.tags.slice(0, 3).join(' / ')}</span>
        <span className="text-zinc-400 shrink-0">Click to inspect</span>
      </div>
    </div>
  );
};

// =========================================================================
// 2. Machine Learning: Model Diagnostics & Evaluation Specs
// =========================================================================
export const DiagnosticsMock: React.FC<{ project: Project }> = ({ project }) => {
  const primaryMetric = project.metrics?.[0] || {
    label: 'Accuracy',
    value: '98.17%',
  };
  const secondaryMetric = project.metrics?.[1] || {
    label: 'Loss',
    value: '0.042',
  };
  const tertiaryMetric = project.metrics?.[2] || {
    label: 'Benchmarked',
    value: 'Optimal',
  };

  const modelName = project.tags[1] || project.tags[0] || 'MODEL';
  const progressWidth = getProgressWidth(primaryMetric.value);

  return (
    <div className="w-full h-full rounded-xl bg-zinc-950/80 border border-white/10 p-3 sm:p-3.5 flex flex-col justify-between select-none font-mono">
      {/* Titlebar */}
      <div className="flex items-center justify-between text-[10px] tracking-wider text-zinc-400 border-b border-white/5 pb-2 uppercase">
        <span className="flex items-center gap-1.5 text-zinc-200 truncate">
          <Activity className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">{modelName} DIAGNOSTICS</span>
        </span>
        <span
          className="font-bold shrink-0 ml-2"
          style={{ color: project.accentColor || '#34d399' }}
        >
          {primaryMetric.value}
        </span>
      </div>

      {/* Main Metric Bar Card */}
      <div className="my-2 space-y-2">
        <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-white/5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-200 font-medium font-sans truncate">
              {project.deliverables?.[0] || project.subtitle}
            </span>
            <span className="text-emerald-400 font-mono text-xs font-bold shrink-0 ml-2">
              {primaryMetric.label}: {primaryMetric.value}
            </span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: progressWidth,
                backgroundColor: project.accentColor || '#10b981',
              }}
            />
          </div>
        </div>

        {/* Benchmark Specs Box */}
        <div className="p-2 rounded-lg bg-zinc-900/40 border border-white/5 space-y-1 text-[11px]">
          <div className="flex justify-between text-zinc-400">
            <span className="shrink-0">{secondaryMetric.label}:</span>
            <span className="text-zinc-200 truncate ml-2 text-right">
              {secondaryMetric.value}
            </span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span className="shrink-0">{tertiaryMetric.label}:</span>
            <span className="text-emerald-400 truncate ml-2 text-right">
              {tertiaryMetric.value}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1.5 border-t border-white/5">
        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300 text-[10px] truncate max-w-[65%]">
          {project.tags.slice(0, 2).join(' / ')}
        </span>
        <span className="text-zinc-500 text-[10px] shrink-0 ml-2">
          {project.status || 'Validated'}
        </span>
      </div>
    </div>
  );
};

// =========================================================================
// 3. Data Engineering: Architecture Flow & DAG Pipeline Mock
// =========================================================================
export const ArchitectureMock: React.FC<{ project: Project }> = ({ project }) => {
  const isZomato =
    project.id.toLowerCase().includes('zomato') ||
    project.title.toLowerCase().includes('zomato');
  const isMarket =
    project.id.toLowerCase().includes('market') ||
    project.id.toLowerCase().includes('crypto-pipeline');
  const isLakehouse = project.id.toLowerCase().includes('lakehouse');
  const isScraper = project.id.toLowerCase().includes('scraper');

  // Only projects that actually use Airflow show the orchestrator on top
  const hasAirflow = isZomato || project.mockType === 'dag';

  // Orchestrator Info (for Airflow projects)
  const orchestratorTitle = isZomato
    ? 'Apache Airflow (zomato_batch)'
    : project.deliverables?.[3] || 'Apache Airflow DAG Engine';

  const dagStatus = isZomato ? 'DAILY BATCH' : 'ACTIVE';

  // Stage 1: Ingest / Source Node
  const node1 = isZomato
    ? { title: 'Snowflake RAW', sub: '35M+ Records Ingest', tag: 'COPY INTO Stage' }
    : isMarket
    ? { title: 'Kafka Cluster', sub: 'Real-Time Ingest', tag: 'Apache Kafka' }
    : isLakehouse
    ? { title: 'Parquet S3', sub: 'Partitioned Lake', tag: 'S3 / MinIO' }
    : isScraper
    ? { title: 'Selenium Driver', sub: 'Dynamic Headless DOM', tag: 'Selenium' }
    : {
        title: project.deliverables?.[0]?.replace(/Cluster|Pipeline|Engine/gi, '').trim() || `${project.tags[0]} Ingest`,
        sub: 'Source Stream',
        tag: project.tags[0],
      };

  // Stage 2: Compute / Transform Node
  const node2 = isZomato
    ? { title: 'dbt Star Schema', sub: 'Delivery SLAs & Marts', tag: 'dbt Core 1.8' }
    : isMarket
    ? { title: 'PySpark Stream', sub: 'Stateful Aggregator', tag: 'Spark Streaming' }
    : isLakehouse
    ? { title: 'dbt Models', sub: 'Dimensional Transforms', tag: 'dbt Core' }
    : isScraper
    ? { title: 'LangChain Agent', sub: 'LLM Schema Parser', tag: 'OpenAI API' }
    : {
        title: project.deliverables?.[1]?.replace(/Cluster|Pipeline|Engine/gi, '').trim() || `${project.tags[1] || 'Compute'} Engine`,
        sub: 'ETL Transform',
        tag: project.tags[1] || 'Transform',
      };

  // Stage 3: Sink / Storage Node
  const node3 = isZomato
    ? { title: 'Text-to-SQL + RAG', sub: 'Review Sentiment AI', tag: 'OpenAI + Streamlit' }
    : isMarket
    ? { title: 'PostgreSQL Store', sub: 'Time-Series Tables', tag: 'PostgreSQL' }
    : isLakehouse
    ? { title: 'DuckDB OLAP', sub: 'Sub-second Query', tag: 'DuckDB Engine' }
    : isScraper
    ? { title: 'JSON Schema Sink', sub: 'Validated Datasets', tag: 'Pandas Store' }
    : {
        title: project.deliverables?.[2]?.replace(/Cluster|Pipeline|Engine/gi, '').trim() || `${project.tags[2] || 'Store'} Sink`,
        sub: 'Sink Target',
        tag: project.tags[2] || 'Storage',
      };

  // Execution trace
  const executionSummary = isZomato
    ? 'reload_raw >> dbt_build_core >> enrich_reviews >> dbt_build_ai'
    : isMarket
    ? 'kafka_produce >> spark_aggregate >> pg_sink'
    : isLakehouse
    ? 's3_lake_scan >> dbt_build >> duckdb_olap'
    : isScraper
    ? 'dom_crawl >> langchain_extract >> json_export'
    : `${project.tags[0]?.toLowerCase()} >> ${project.tags[1]?.toLowerCase()} >> ${project.tags[2]?.toLowerCase()}`;

  const slaMetric = isZomato
    ? '35M+ Rows • Daily'
    : isMarket
    ? '<150ms Latency'
    : isLakehouse
    ? '12M Trades/day'
    : isScraper
    ? '99.1% Accuracy'
    : project.metrics?.[0]?.value || 'Active DAG';

  const throughput = project.metrics?.[0]?.value || 'Active Flow';
  const accent = project.accentColor || '#38bdf8';

  return (
    <div className="w-full h-full rounded-xl bg-zinc-950/85 border border-white/10 p-3 sm:p-3.5 flex flex-col justify-between font-mono text-xs select-none overflow-hidden shadow-2xl">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px]">
        <div className="flex items-center gap-1.5 text-zinc-300 truncate">
          <Workflow className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="truncate font-sans font-medium text-zinc-200">
            {project.tags[0]} &bull; {project.title}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] shrink-0 ml-2 font-mono">
          {throughput}
        </span>
      </div>

      {/* 2. Architecture & DAG Flow Area */}
      <div className="my-1.5 flex-1 flex flex-col justify-between">
        {hasAirflow && (
          <>
            {/* Top Control Plane: Centered Airflow Orchestrator */}
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-zinc-900/95 border border-sky-500/35 shadow-[0_0_12px_rgba(56,189,248,0.16)] text-[9.5px] sm:text-[10px] font-mono">
                <Workflow className="w-3 h-3 text-sky-400 shrink-0 animate-spin-slow" />
                <span className="text-zinc-200 font-semibold truncate max-w-[170px] sm:max-w-[240px]">
                  {orchestratorTitle}
                </span>
                <span className="inline-flex items-center gap-1 text-[8px] sm:text-[8.5px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0 ml-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {dagStatus}
                </span>
              </div>
              {/* Stem connecting Airflow badge to the distribution crossbar */}
              <div className="w-px h-1.5 bg-sky-400/70 -mb-0.5" />
            </div>

            {/* Distribution Crossbar with Drop Stems into Columns (aligned with 11-col grid) */}
            <div className="grid grid-cols-11 gap-1 relative h-4 sm:h-5 mb-1">
              {/* Col 1-3: Branch 1 (Ingest) */}
              <div className="col-span-3 relative h-full">
                <div className="absolute top-1/2 left-1/2 -right-1 border-t border-dashed border-sky-400/60" />
                <div className="absolute top-1/2 bottom-1 left-1/2 -translate-x-1/2 w-px border-l border-dashed border-sky-400/60" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5px] border-t-sky-400 select-none shadow-sm" />
              </div>

              {/* Col 4: Connector 1 Crossbar bridge */}
              <div className="col-span-1 relative h-full">
                <div className="absolute top-1/2 -left-1 -right-1 border-t border-dashed border-sky-400/60" />
              </div>

              {/* Col 5-7: Branch 2 (Process - Center Trunk) */}
              <div className="col-span-3 relative h-full">
                <div className="absolute top-0 bottom-1 left-1/2 -translate-x-1/2 w-px border-l border-sky-400/70" />
                <div className="absolute top-1/2 -left-1 -right-1 border-t border-sky-400/70" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] border border-white/50 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5px] border-t-emerald-400 select-none shadow-sm" />
              </div>

              {/* Col 8: Connector 2 Crossbar bridge */}
              <div className="col-span-1 relative h-full">
                <div className="absolute top-1/2 -left-1 -right-1 border-t border-dashed border-sky-400/60" />
              </div>

              {/* Col 9-11: Branch 3 (Sink / AI) */}
              <div className="col-span-3 relative h-full">
                <div className="absolute top-1/2 -left-1 right-1/2 border-t border-dashed border-sky-400/60" />
                <div className="absolute top-1/2 bottom-1 left-1/2 -translate-x-1/2 w-px border-l border-dashed border-sky-400/60" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[5px] border-t-amber-400 select-none shadow-sm" />
              </div>
            </div>
          </>
        )}

        {/* 3 Interconnected Stages with step-by-step horizontal connection lines */}
        <div className="grid grid-cols-11 items-center gap-1">
          {/* Node 1: Ingest */}
          <div
            className={`col-span-3 p-1.5 sm:p-2 rounded-lg bg-zinc-900/80 border border-sky-500/25 flex flex-col justify-between ${
              hasAirflow ? 'min-h-[64px] sm:min-h-[68px]' : 'min-h-[74px] sm:min-h-[80px]'
            } shadow-sm`}
          >
            <div className="flex items-center gap-1 text-[8px] sm:text-[8.5px] text-sky-400 font-semibold uppercase tracking-wider">
              <Radio className="w-2.5 h-2.5 shrink-0 animate-pulse" />
              <span className="truncate">Ingest</span>
            </div>
            <div className="my-0.5">
              <span className="text-zinc-100 text-[9px] sm:text-[10px] font-sans font-semibold block truncate leading-tight">
                {node1.title}
              </span>
              <span className="text-zinc-400 text-[7.5px] sm:text-[8.5px] truncate block">
                {node1.sub}
              </span>
            </div>
            <span className="text-[7px] sm:text-[8px] text-sky-400/80 font-mono truncate">
              {node1.tag}
            </span>
          </div>

          {/* Connector 1: Step 1 -> Step 2 */}
          <div className="col-span-1 flex items-center justify-center relative w-full h-full">
            <div className="w-full border-t border-dashed border-sky-400/50 absolute top-1/2 -translate-y-1/2" />
            <div className="relative z-10 bg-zinc-950 p-0.5 rounded-full border border-sky-500/40 flex items-center justify-center shadow-sm">
              <ArrowRight className="w-2.5 h-2.5 text-sky-400 shrink-0" />
              <span className="w-2 h-2 rounded-full bg-sky-400/40 animate-ping absolute pointer-events-none" />
            </div>
          </div>

          {/* Node 2: Transform / Compute */}
          <div
            className={`col-span-3 p-1.5 sm:p-2 rounded-lg bg-zinc-900/90 border border-emerald-500/35 flex flex-col justify-between ${
              hasAirflow ? 'min-h-[64px] sm:min-h-[68px]' : 'min-h-[74px] sm:min-h-[80px]'
            } shadow-sm relative overflow-hidden`}
            style={{ boxShadow: `0 0 10px ${accent}18` }}
          >
            <div className="flex items-center gap-1 text-[8px] sm:text-[8.5px] text-emerald-400 font-semibold uppercase tracking-wider">
              <Cpu className="w-2.5 h-2.5 shrink-0" />
              <span className="truncate">Process</span>
            </div>
            <div className="my-0.5">
              <span className="text-zinc-100 text-[9px] sm:text-[10px] font-sans font-semibold block truncate leading-tight">
                {node2.title}
              </span>
              <span className="text-emerald-400/90 text-[7.5px] sm:text-[8.5px] truncate block font-mono">
                {node2.sub}
              </span>
            </div>
            <span className="text-[7px] sm:text-[8px] text-emerald-400/80 font-mono truncate">
              {node2.tag}
            </span>
          </div>

          {/* Connector 2: Step 2 -> Step 3 */}
          <div className="col-span-1 flex items-center justify-center relative w-full h-full">
            <div className="w-full border-t border-dashed border-emerald-400/50 absolute top-1/2 -translate-y-1/2" />
            <div className="relative z-10 bg-zinc-950 p-0.5 rounded-full border border-emerald-500/40 flex items-center justify-center shadow-sm">
              <ArrowRight className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span className="w-2 h-2 rounded-full bg-emerald-400/40 animate-ping absolute pointer-events-none" />
            </div>
          </div>

          {/* Node 3: Sink / Serve */}
          <div
            className={`col-span-3 p-1.5 sm:p-2 rounded-lg bg-zinc-900/80 border border-amber-500/25 flex flex-col justify-between ${
              hasAirflow ? 'min-h-[64px] sm:min-h-[68px]' : 'min-h-[74px] sm:min-h-[80px]'
            } shadow-sm`}
          >
            <div className="flex items-center gap-1 text-[8px] sm:text-[8.5px] text-amber-400 font-semibold uppercase tracking-wider">
              {isZomato ? (
                <Sparkles className="w-2.5 h-2.5 shrink-0 text-rose-400" />
              ) : (
                <Database className="w-2.5 h-2.5 shrink-0 text-amber-400" />
              )}
              <span className="truncate">{isZomato ? 'Serve / AI' : 'Sink Target'}</span>
            </div>
            <div className="my-0.5">
              <span className="text-zinc-100 text-[9px] sm:text-[10px] font-sans font-semibold block truncate leading-tight">
                {node3.title}
              </span>
              <span className="text-zinc-400 text-[7.5px] sm:text-[8.5px] truncate block">
                {node3.sub}
              </span>
            </div>
            <span className="text-[7px] sm:text-[8px] text-amber-400/80 font-mono truncate">
              {node3.tag}
            </span>
          </div>
        </div>

        {/* 5. Orchestration / Pipeline Execution Trace */}
        <div className="mt-2 flex items-center justify-between px-2.5 py-1 rounded-md bg-black/60 border border-white/5 text-[9.5px]">
          <div className="flex items-center gap-1.5 text-zinc-400 truncate">
            {hasAirflow ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <span className="truncate text-zinc-300 font-mono">
                  <span className="text-zinc-500 font-sans mr-1">DAG Tasks:</span>
                  {executionSummary}
                </span>
              </>
            ) : (
              <>
                <Layers className="w-3 h-3 text-sky-400 shrink-0" />
                <span className="truncate text-zinc-300 font-mono">
                  <span className="text-zinc-500 font-sans mr-1">Pipeline:</span>
                  {executionSummary}
                </span>
              </>
            )}
          </div>
          <span className="text-sky-400 font-mono text-[8.5px] sm:text-[9px] shrink-0 ml-2">
            {slaMetric}
          </span>
        </div>
      </div>

      {/* 3. Footer */}
      <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1.5 border-t border-white/5">
        <span className="truncate">{project.tags.slice(0, 3).join(' / ')}</span>
        <span className="text-zinc-400 shrink-0 ml-2 font-sans">Click to inspect</span>
      </div>
    </div>
  );
};

export const PipelineMock = ArchitectureMock;

// =========================================================================
// 4. Full Stack: Interactive Dialogue / RAG Agent
// =========================================================================
export const AssistantMock: React.FC<{ project: Project }> = ({ project }) => {
  const isVideo =
    project.id.toLowerCase().includes('youtube') ||
    project.title.toLowerCase().includes('video');
  const isCode =
    project.id.toLowerCase().includes('code') ||
    project.id.toLowerCase().includes('pr') ||
    project.title.toLowerCase().includes('code');

  const HeaderIcon = isVideo ? Video : isCode ? Code2 : Layers;
  const iconColor = isVideo
    ? 'text-red-400'
    : isCode
    ? 'text-emerald-400'
    : 'text-violet-400';

  const userQuery =
    project.subtitle || project.deliverables?.[0] || 'Execute prompt query';
  const responseSummary =
    project.deliverables?.[0] || project.description.split('.')[0] || 'Execution successful.';
  const primaryMetric =
    project.metrics?.[0]?.value || 'Ready';

  return (
    <div className="w-full h-full rounded-xl bg-zinc-950/80 border border-white/10 p-3 sm:p-3.5 flex flex-col justify-between font-mono text-xs select-none">
      {/* Titlebar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[11px]">
        <div className="flex items-center gap-2 truncate">
          <HeaderIcon className={`w-3.5 h-3.5 ${iconColor} shrink-0`} />
          <span className="text-zinc-200 font-sans font-medium truncate">
            {project.title}
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 shrink-0 ml-2">
          {project.tags.slice(0, 2).join(' + ')}
        </span>
      </div>

      {/* Query & Response Dialogue */}
      <div className="my-2 space-y-2 bg-black/40 p-2.5 rounded-lg border border-white/5">
        <div className="flex items-start gap-2 text-[11px]">
          <span className="text-zinc-500 font-bold shrink-0">User:</span>
          <span className="text-zinc-300 line-clamp-1">"{userQuery}"</span>
        </div>

        <div className="flex items-start gap-2 text-[11px] bg-zinc-900/60 p-2 rounded border border-white/5">
          <Bot className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-zinc-300 leading-snug line-clamp-2">
            <span className="text-emerald-400 font-semibold mr-1">
              [{primaryMetric}]
            </span>
            {responseSummary}.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1.5 border-t border-white/5">
        <span className="truncate">{project.tags.slice(0, 3).join(' • ')}</span>
        <span className="text-zinc-400 shrink-0 ml-2">
          {project.metrics?.[1]?.value
            ? `${project.metrics[1].label}: ${project.metrics[1].value}`
            : '<1.5s Latency'}
        </span>
      </div>
    </div>
  );
};

// =========================================================================
// 5. Full Stack / Web Apps: In-Browser Web Application & IDE Mock
// =========================================================================
export const WebpageMock: React.FC<{ project: Project }> = ({ project }) => {
  const isIde =
    project.id === 'codegen' ||
    project.tags.some((t) => /webcontainer|codemirror/i.test(t));
  const isReviewer =
    project.id === 'ai-code-reviewer' ||
    project.id.toLowerCase().includes('review');
  const isCanvas =
    project.id === 'collab-canvas' ||
    project.id.toLowerCase().includes('canvas') ||
    project.id.toLowerCase().includes('collab');
  const isVideo =
    project.id === 'youtube-chatbot' ||
    project.id.toLowerCase().includes('youtube');

  const liveDomain = project.links.live
    ? project.links.live.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : isReviewer
    ? 'pr-reviewer.app/pull/142'
    : isCanvas
    ? 'collab-canvas.io/doc/roadmap'
    : isVideo
    ? 'youtube-rag.app/watch'
    : `${project.id}.vercel.app`;

  const accent = project.accentColor || '#6C47FF';
  const primaryMetric = project.metrics?.[0]?.value || 'Live Service';
  const secondaryMetric = project.metrics?.[1]?.value || '<50ms Latency';

  return (
    <div className="w-full h-full rounded-xl bg-[#0c0f14] border border-white/10 flex flex-col justify-between text-xs font-mono select-none overflow-hidden shadow-2xl">
      {/* 1. Browser Chrome / Window Titlebar */}
      <div className="px-3 py-1.5 bg-zinc-950/90 border-b border-white/5 flex items-center justify-between gap-2">
        {/* Window controls (traffic light dots) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 border border-rose-500/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 border border-amber-500/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 border border-emerald-500/40" />
        </div>

        {/* Browser URL bar */}
        <div className="flex-1 max-w-[210px] sm:max-w-[280px] mx-auto flex items-center justify-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-900/90 border border-white/5 text-[10px] text-zinc-400 truncate">
          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="truncate text-zinc-300 font-sans tracking-tight">
            {liveDomain}
          </span>
        </div>

        {/* Live environment badge */}
        <div className="flex items-center gap-1 shrink-0 text-[10px] text-zinc-400 font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline text-zinc-400">Live</span>
        </div>
      </div>

      {/* 2. Web Application Workspace Viewport */}
      <div className="flex-1 flex overflow-hidden bg-black/40 relative">
        {/* Activity Sidebar */}
        <div className="w-7 sm:w-8 bg-zinc-950/70 border-r border-white/5 flex flex-col items-center py-2 gap-2 text-zinc-500 shrink-0">
          {isReviewer ? (
            <>
              <GitPullRequest className="w-3.5 h-3.5 text-purple-400" />
              <Code2 className="w-3.5 h-3.5 text-zinc-400" />
              <Bot className="w-3.5 h-3.5 text-sky-400" />
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-auto" />
            </>
          ) : isCanvas ? (
            <>
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <Users className="w-3.5 h-3.5 text-sky-400" />
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <Terminal className="w-3.5 h-3.5 text-zinc-600 mt-auto" />
            </>
          ) : isVideo ? (
            <>
              <Video className="w-3.5 h-3.5 text-red-400" />
              <Bot className="w-3.5 h-3.5 text-sky-400" />
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <Terminal className="w-3.5 h-3.5 text-zinc-600 mt-auto" />
            </>
          ) : (
            <>
              <FolderGit2 className="w-3.5 h-3.5 text-zinc-400" />
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <Terminal className="w-3.5 h-3.5 text-zinc-600 mt-auto" />
            </>
          )}
        </div>

        {/* Main Viewport Content */}
        <div className="flex-1 flex flex-col justify-between p-2 sm:p-2.5 overflow-hidden">
          {/* VARIANT A: AI Code Reviewer (GitHub PR Dashboard & AST Diff) */}
          {isReviewer ? (
            <>
              <div className="flex items-center justify-between border-b border-white/5 pb-1 text-[10px]">
                <div className="flex items-center gap-1.5 text-zinc-300 font-sans font-medium truncate">
                  <GitPullRequest className="w-3 h-3 text-purple-400 shrink-0" />
                  <span className="truncate">PR #142: AstSecurityFix</span>
                </div>
                <span className="flex items-center gap-1 text-[9px] font-sans font-semibold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5 shrink-0" /> 3 Passed
                </span>
              </div>

              {/* Code Diff Viewer */}
              <div className="my-1 p-1.5 rounded bg-zinc-950/80 border border-white/5 text-[9.5px] font-mono space-y-1 overflow-hidden">
                <div className="px-1.5 py-0.5 rounded bg-rose-950/40 text-rose-300 border-l-2 border-rose-500 truncate">
                  - const token = req.query.token; // AST flaw
                </div>
                <div className="px-1.5 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500 truncate">
                  + const token = await auth.verify(req);
                </div>
                <div className="px-1.5 py-0.5 rounded bg-zinc-900/90 border border-white/5 flex items-center gap-1 text-[8.5px] text-zinc-300">
                  <Bot className="w-3 h-3 text-sky-400 shrink-0" />
                  <span className="truncate">
                    <strong className="text-sky-300 font-medium">AST Bot:</strong> Verified fix. 0 security leaks ({primaryMetric}).
                  </span>
                </div>
              </div>

              {/* Bottom Dock */}
              <div className="flex items-center justify-between px-2 py-0.5 rounded bg-zinc-900/60 border border-white/5 text-[9px] text-zinc-400">
                <span className="truncate text-zinc-300">GitHub Webhook &rarr; FastAPI AST Engine</span>
                <span className="text-zinc-500 shrink-0 ml-1">{secondaryMetric}</span>
              </div>
            </>
          ) : isCanvas ? (
            /* VARIANT B: Collab Canvas (Multi-User Live Presence Editor) */
            <>
              <div className="flex items-center justify-between border-b border-white/5 pb-1 text-[10px]">
                <div className="flex items-center gap-2 text-zinc-400 text-[9.5px] font-sans font-medium truncate">
                  <span className="px-1 rounded bg-zinc-800 text-zinc-300 font-bold">B</span>
                  <span className="px-1 rounded hover:bg-zinc-800 italic">I</span>
                  <span className="px-1 rounded hover:bg-zinc-800 underline">U</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-zinc-300 truncate">Architecture.md</span>
                </div>
                <span className="flex items-center gap-1 text-[9px] font-sans font-semibold text-sky-400 px-1.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 shrink-0">
                  <Users className="w-2.5 h-2.5 shrink-0" /> 3 Online
                </span>
              </div>

              {/* Live Canvas with Multi-Cursor Flags */}
              <div className="my-1 p-2 rounded bg-zinc-950/80 border border-white/5 text-[10px] font-mono space-y-1.5 overflow-hidden">
                <div className="text-zinc-400 truncate">
                  ## WebSocket Sync Engine
                </div>
                <div className="text-zinc-300 text-[9.5px] truncate flex items-center flex-wrap gap-1">
                  <span>State synced via Redis Pub/Sub</span>
                  <span className="bg-sky-500 text-black px-1 py-0.5 rounded text-[8px] font-sans font-bold shadow-sm">
                    | Anindya
                  </span>
                </div>
                <div className="text-zinc-400 text-[9px] truncate flex items-center flex-wrap gap-1">
                  <span>Live multi-cursor broadcasting</span>
                  <span className="bg-emerald-400 text-black px-1 py-0.5 rounded text-[8px] font-sans font-bold shadow-sm">
                    | Elena (editing)
                  </span>
                </div>
              </div>

              {/* Bottom Dock */}
              <div className="flex items-center justify-between px-2 py-0.5 rounded bg-zinc-900/60 border border-white/5 text-[9px] text-zinc-400">
                <span className="truncate text-zinc-300">Redis Channel: #workspace-alpha</span>
                <span className="text-emerald-400 font-semibold shrink-0 ml-1">{primaryMetric} latency</span>
              </div>
            </>
          ) : isVideo ? (
            /* VARIANT C: YouTube Chatbot (Studio Video + Interactive Transcript RAG) */
            <>
              <div className="flex items-center justify-between border-b border-white/5 pb-1 text-[10px]">
                <div className="flex items-center gap-1.5 text-zinc-300 font-sans font-medium truncate">
                  <Video className="w-3 h-3 text-red-400 shrink-0" />
                  <span className="truncate">YouTube RAG Studio</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-red-950/50 text-red-400 border border-red-500/30 text-[9px] font-sans font-semibold shrink-0">
                  LIVE [04:12]
                </span>
              </div>

              {/* Media Player + Transcript Q&A */}
              <div className="my-1 p-1.5 rounded bg-zinc-950/80 border border-white/5 text-[9.5px] space-y-1.5 overflow-hidden">
                <div className="flex items-center justify-between px-2 py-1 rounded bg-black/60 border border-white/5 text-zinc-300">
                  <span className="flex items-center gap-1.5 text-[9px] truncate">
                    <Play className="w-2.5 h-2.5 text-red-400 fill-red-400 shrink-0" />
                    <span className="truncate">Attention Mechanism Breakdown (04:12 / 24:35)</span>
                  </span>
                  <span className="text-[8.5px] font-mono text-zinc-500 shrink-0">1080p</span>
                </div>

                <div className="px-2 py-1 rounded bg-zinc-900/90 border border-white/5 text-[9px] space-y-0.5">
                  <div className="text-zinc-400 truncate">
                    <strong className="text-zinc-300">Q:</strong> "Summarize formula at 04:12"
                  </div>
                  <div className="text-emerald-300 text-[8.5px] truncate flex items-center gap-1">
                    <Bot className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Scaled dot-product attention computed across sequences ({primaryMetric}).</span>
                  </div>
                </div>
              </div>

              {/* Bottom Dock */}
              <div className="flex items-center justify-between px-2 py-0.5 rounded bg-zinc-900/60 border border-white/5 text-[9px] text-zinc-400">
                <span className="truncate text-zinc-300">Streamlit + LangChain Vector Store</span>
                <span className="text-zinc-500 shrink-0 ml-1">{secondaryMetric}</span>
              </div>
            </>
          ) : (
            /* VARIANT D: CodeGen & Cloud In-Browser IDE */
            <>
              <div className="flex items-center justify-between border-b border-white/5 pb-1 text-[10px]">
                <div className="flex items-center gap-1 text-zinc-400 truncate">
                  <span className="text-zinc-600">src /</span>
                  <span className="text-zinc-200 font-sans font-medium truncate">
                    {isIde ? 'AgentEditor.tsx' : `${project.id}.tsx`}
                  </span>
                </div>
                <span
                  className="px-1.5 py-0.5 rounded text-[9px] font-sans font-semibold border shrink-0"
                  style={{
                    borderColor: `${accent}40`,
                    backgroundColor: `${accent}18`,
                    color: accent,
                  }}
                >
                  {isIde ? 'WebContainer Active' : primaryMetric}
                </span>
              </div>

              {/* Code Editor Viewport */}
              <div className="my-1.5 p-2 rounded bg-zinc-950/80 border border-white/5 font-mono text-[10px] space-y-1 overflow-hidden leading-relaxed">
                <div className="flex items-center gap-1.5 text-zinc-400 truncate">
                  <span className="text-zinc-600 select-none w-3 text-right shrink-0">1</span>
                  <span className="text-sky-400 shrink-0">import</span>
                  <span className="text-zinc-300 truncate">&#123; {isIde ? 'createAgent' : 'useSession'} &#125;</span>
                  <span className="text-sky-400 shrink-0">from</span>
                  <span className="text-emerald-300 truncate">{isIde ? '"@inngest/agent"' : '"convex/react"'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 truncate">
                  <span className="text-zinc-600 select-none w-3 text-right shrink-0">2</span>
                  <span className="text-purple-400 shrink-0">const</span>
                  <span className="text-amber-200 shrink-0">runtime</span>
                  <span className="text-zinc-500">=</span>
                  <span className="text-sky-400 shrink-0">new</span>
                  <span className="text-zinc-200 truncate">{isIde ? 'WebContainer()' : 'ClientSync()'}</span>
                </div>

                {/* Inline AI Suggestion Banner */}
                <div className="mt-1 px-2 py-0.5 rounded bg-zinc-900/90 border border-emerald-500/30 flex items-center justify-between gap-1 text-[9px]">
                  <span className="flex items-center gap-1.5 text-emerald-400 truncate font-sans font-medium">
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span className="truncate">
                      {project.deliverables?.[0] || 'AI Agent: files synced'}
                    </span>
                  </span>
                  <span className="text-zinc-500 font-mono text-[8px] shrink-0 hidden sm:inline">Tab ⇥</span>
                </div>
              </div>

              {/* Bottom Dock */}
              <div className="flex items-center justify-between px-2 py-1 rounded bg-zinc-900/60 border border-white/5 text-[9.5px] text-zinc-400">
                <span className="flex items-center gap-1.5 truncate">
                  <Terminal className="w-3 h-3 text-sky-400 shrink-0" />
                  <span className="truncate text-zinc-300">
                    $ {project.tags[0].toLowerCase()} dev &rarr; <span className="text-emerald-400 font-semibold">localhost:3000</span>
                  </span>
                </span>
                <span className="text-zinc-500 text-[9px] shrink-0 ml-2 hidden sm:inline">
                  {secondaryMetric}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3. Footer Bar */}
      <div className="px-3 py-1.5 bg-zinc-950/90 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500">
        <span className="truncate">{project.tags.slice(0, 3).join(' / ')}</span>
        <span className="text-zinc-400 shrink-0 font-sans ml-2">Click to inspect</span>
      </div>
    </div>
  );
};

// =========================================================================
// Main Dynamic Project Mock Component
// Automatically resolves the archetype from project.mockType or project.category
// =========================================================================
export const ProjectCardMock: React.FC<{ project: Project }> = ({ project }) => {
  // If mockType is explicitly specified:
  switch (project.mockType) {
    case 'vision':
    case 'cv':
    case 'football':
      return <VisionMock project={project} />;
    case 'metrics':
    case 'diagnostics':
    case 'ml':
    case 'plant':
      return <DiagnosticsMock project={project} />;
    case 'terminal':
    case 'pipeline':
    case 'architecture':
    case 'dag':
    case 'scraper':
      return <ArchitectureMock project={project} />;
    case 'webpage':
    case 'browser':
    case 'ide':
    case 'app':
      return <WebpageMock project={project} />;
    case 'chat':
    case 'assistant':
    case 'youtube':
      return <AssistantMock project={project} />;
    default:
      // Automatic selection based on project.category
      switch (project.category) {
        case 'CV + NLP':
          return <VisionMock project={project} />;
        case 'Machine Learning':
          return <DiagnosticsMock project={project} />;
        case 'Data Engineering':
          return <PipelineMock project={project} />;
        case 'Full Stack':
          return <WebpageMock project={project} />;
        default:
          return <WebpageMock project={project} />;
      }
  }
};

// Alias
export const DynamicProjectMock = ProjectCardMock;

// =========================================================================
// Legacy Fallback Components (Preserved for backwards compatibility)
// =========================================================================
export const FootballVisionMock: React.FC<{ project?: Project }> = ({ project }) => {
  const fallbackProject =
    project ||
    PROJECTS_DATA.find((p) => p.id === 'football-analysis') ||
    PROJECTS_DATA[0];
  return <VisionMock project={fallbackProject} />;
};

export const PlantDiseaseMock: React.FC<{ project?: Project }> = ({ project }) => {
  const fallbackProject =
    project ||
    PROJECTS_DATA.find((p) => p.id === 'plant-disease') ||
    PROJECTS_DATA[3];
  return <DiagnosticsMock project={fallbackProject} />;
};

export const ScraperMock: React.FC<{ project?: Project }> = ({ project }) => {
  const fallbackProject =
    project ||
    PROJECTS_DATA.find((p) => p.id === 'ai-web-scraper') ||
    PROJECTS_DATA[6];
  return <PipelineMock project={fallbackProject} />;
};

export const YouTubeChatbotMock: React.FC<{ project?: Project }> = ({ project }) => {
  const fallbackProject =
    project ||
    PROJECTS_DATA.find((p) => p.id === 'youtube-chatbot') ||
    PROJECTS_DATA[9];
  return <AssistantMock project={fallbackProject} />;
};
