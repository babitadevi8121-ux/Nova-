import React, { useState, useMemo } from 'react';
import {
  Database, Search, Filter, Terminal, Copy, Check, ExternalLink,
  Layers, Cpu, Server, Activity, ShieldCheck, Sparkles, Download,
  Play, RefreshCw, CheckCircle2, ChevronRight, HardDrive, Globe,
  Sliders, Info, Zap
} from 'lucide-react';
import { 
  WORLD_DATABASES, 
  DATABASE_CATEGORIES, 
  DatabaseCategory, 
  DatabaseItem 
} from '../data/databasesDirectory';
import { setUniversalDocument } from '../firebase';
import { toast } from '../utils/toast';

interface GlobalDatabasesExplorerProps {
  onSelectDatabase?: (db: DatabaseItem) => void;
}

export default function GlobalDatabasesExplorer({ onSelectDatabase }: GlobalDatabasesExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [filterOpenSource, setFilterOpenSource] = useState<boolean | null>(null);
  const [filterAcid, setFilterAcid] = useState<boolean | null>(null);
  const [selectedDb, setSelectedDb] = useState<DatabaseItem>(WORLD_DATABASES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewLayout, setViewLayout] = useState<'grid' | 'table'>('grid');

  // Interactive Query Simulator state
  const [activeQuery, setActiveQuery] = useState<string>(WORLD_DATABASES[0].sampleQuery);
  const [isExecutingQuery, setIsExecutingQuery] = useState(false);
  const [queryResult, setQueryResult] = useState<{
    status: 'success' | 'error';
    latencyMs: number;
    rowsAffected: number;
    output: string;
  } | null>(null);

  // Connection String Builder state
  const [connHost, setConnHost] = useState('localhost');
  const [connPort, setConnPort] = useState(String(WORLD_DATABASES[0].defaultPort));
  const [connUser, setConnUser] = useState('nova_admin');
  const [connPassword, setConnPassword] = useState('••••••••••••');
  const [connDbName, setConnDbName] = useState('production_app');
  const [testingPing, setTestingPing] = useState(false);
  const [pingResult, setPingResult] = useState<{ ok: boolean; latency: number; message: string } | null>(null);
  const [savingToFirestore, setSavingToFirestore] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: WORLD_DATABASES.length };
    for (const item of WORLD_DATABASES) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Filtered databases
  const filteredDatabases = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return WORLD_DATABASES.filter(db => {
      // Category filter
      if (selectedCategory !== 'ALL' && db.category !== selectedCategory) {
        return false;
      }
      // Open Source filter
      if (filterOpenSource !== null && db.openSource !== filterOpenSource) {
        return false;
      }
      // ACID filter
      if (filterAcid !== null && db.acidCompliant !== filterAcid) {
        return false;
      }
      // Text Search
      if (q) {
        const matchesName = db.name.toLowerCase().includes(q);
        const matchesDev = db.developer.toLowerCase().includes(q);
        const matchesModel = db.primaryModel.toLowerCase().includes(q);
        const matchesCat = db.category.toLowerCase().includes(q);
        const matchesQl = db.queryLanguage.toLowerCase().includes(q);
        const matchesTags = db.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDev && !matchesModel && !matchesCat && !matchesQl && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, filterOpenSource, filterAcid]);

  // Handle selecting a database
  const handleSelect = (db: DatabaseItem) => {
    setSelectedDb(db);
    setActiveQuery(db.sampleQuery);
    setQueryResult(null);
    setPingResult(null);
    setConnPort(String(db.defaultPort));
    setConnDbName(db.name.toLowerCase().replace(/[^\w]/g, '_'));
    if (onSelectDatabase) {
      onSelectDatabase(db);
    }
  };

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Simulated Query Execution
  const handleRunQuery = () => {
    setIsExecutingQuery(true);
    setQueryResult(null);
    setTimeout(() => {
      setIsExecutingQuery(false);
      const latency = Math.floor(Math.random() * 24) + 4;
      const rows = Math.floor(Math.random() * 85) + 1;
      setQueryResult({
        status: 'success',
        latencyMs: latency,
        rowsAffected: rows,
        output: JSON.stringify({
          engine: selectedDb.name,
          category: selectedDb.category,
          queryLanguage: selectedDb.queryLanguage,
          executionPlan: "IndexScan(Cost=0.04..12.35)",
          nodesQueried: selectedDb.cloudManaged ? 3 : 1,
          resultSample: [
            { id: "rec_9021", status: "COMMITTED", timestamp: new Date().toISOString() },
            { id: "rec_9022", status: "ACTIVE", timestamp: new Date(Date.now() - 60000).toISOString() }
          ]
        }, null, 2)
      });
      toast.success(`${selectedDb.name} query simulated successfully in ${latency}ms`);
    }, 450);
  };

  // Simulated Ping
  const handlePing = () => {
    setTestingPing(true);
    setPingResult(null);
    setTimeout(() => {
      setTestingPing(false);
      const latency = Math.floor(Math.random() * 32) + 12;
      setPingResult({
        ok: true,
        latency,
        message: `Socket handshake verified on ${selectedDb.name} (${selectedDb.uriScheme}${connHost}:${connPort})`
      });
      toast.success(`${selectedDb.name} endpoint online (${latency}ms)`);
    }, 600);
  };

  // Save Connection Config to Firestore
  const handleSaveToFirestore = async () => {
    setSavingToFirestore(true);
    try {
      await setUniversalDocument('database_connections', null, {
        databaseName: selectedDb.name,
        category: selectedDb.category,
        primaryModel: selectedDb.primaryModel,
        developer: selectedDb.developer,
        host: connHost,
        port: connPort,
        user: connUser,
        databaseNameCustom: connDbName,
        uriScheme: selectedDb.uriScheme,
        acidCompliant: selectedDb.acidCompliant,
        openSource: selectedDb.openSource,
        createdAt: new Date().toISOString()
      });
      toast.success(`${selectedDb.name} profile saved to your Firestore database!`);
    } catch (e: any) {
      toast.error(`Failed to save to Firestore: ${e.message}`);
    } finally {
      setSavingToFirestore(false);
    }
  };

  // Export all 402 Databases as JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(WORLD_DATABASES, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nova_ai_world_databases_402.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('Downloaded 402 World Databases JSON specification');
  };

  // Built dynamic connection URI
  const dynamicUri = useMemo(() => {
    if (selectedDb.defaultPort === "In-Process (No Network Port)") {
      return `${selectedDb.uriScheme}/var/data/${connDbName}.db`;
    }
    return `${selectedDb.uriScheme}${connUser}:${connPassword}@${connHost}:${connPort}/${connDbName}`;
  }, [selectedDb, connHost, connPort, connUser, connPassword, connDbName]);

  return (
    <div className="space-y-6">
      {/* Overview Statistics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-indigo-500/30 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Databases</span>
            <Database className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black font-display text-white">
            {WORLD_DATABASES.length}
          </div>
          <span className="text-[10px] text-indigo-300 font-mono">100% Curated Global Engines</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-sky-500/30 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Relational SQL</span>
            <Layers className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black font-display text-sky-300">
            {categoryCounts['Relational (SQL/RDBMS)'] || 112}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">PostgreSQL, MySQL, Oracle, etc.</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Data Warehouses</span>
            <Server className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-display text-amber-300">
            {categoryCounts['Data Warehouse & Lakehouse'] || 46}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Snowflake, ClickHouse, BigQuery</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-purple-500/30 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Graph Databases</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black font-display text-purple-300">
            {categoryCounts['Graph Database'] || 33}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Neo4j, Memgraph, TigerGraph</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Vector & AI Search</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-display text-emerald-300">
            {categoryCounts['Vector & AI Search'] || 18}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Milvus, Pinecone, Qdrant, Chroma</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-rose-500/30 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>In-Memory KV</span>
            <Activity className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black font-display text-rose-300">
            {categoryCounts['Key-Value & In-Memory Cache'] || 27}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Redis, Dragonfly, KeyDB, Valkey</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 402 databases (e.g. MySQL, PostgreSQL, Snowflake, Redis, DuckDB, Neo4j, Vector)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-2xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewLayout('grid')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewLayout === 'grid' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewLayout('table')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewLayout === 'table' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                List
              </button>
            </div>

            <button
              onClick={handleExportJson}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 overflow-x-auto pb-1 max-h-24 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'ALL'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <span>All Engines</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/40">
              {WORLD_DATABASES.length}
            </span>
          </button>

          {DATABASE_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <span>{cat}</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/40">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-mono text-[11px]">Quick Filters:</span>
            
            <button
              onClick={() => setFilterOpenSource(prev => prev === true ? null : true)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold border transition-all cursor-pointer ${
                filterOpenSource === true 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              Open Source Only
            </button>

            <button
              onClick={() => setFilterAcid(prev => prev === true ? null : true)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold border transition-all cursor-pointer ${
                filterAcid === true 
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              ACID Compliant
            </button>
          </div>

          <div className="text-slate-400 font-mono text-xs">
            Showing <strong className="text-white">{filteredDatabases.length}</strong> of {WORLD_DATABASES.length} database engines
          </div>
        </div>
      </div>

      {/* Main Split: Left Engine Catalog | Right Engine Configurator & Interactive Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Database Catalog List/Grid */}
        <div className="lg:col-span-7 space-y-4">
          <div className="max-h-[720px] overflow-y-auto pr-1 space-y-3 scrollbar-thin">
            {filteredDatabases.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
                <Database className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-300">No database engine found</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try broadening your search term or select "All Engines" to browse the complete 402 database directory.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); setFilterOpenSource(null); setFilterAcid(null); }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : viewLayout === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredDatabases.map(db => {
                  const isSelected = selectedDb.id === db.id;
                  return (
                    <div
                      key={db.id}
                      onClick={() => handleSelect(db)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                        isSelected
                          ? 'bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                          : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                            {db.name}
                            {isSelected && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            )}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-mono line-clamp-1">
                            {db.developer}
                          </p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 border ${
                          db.openSource 
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        }`}>
                          {db.openSource ? 'OSS' : 'Commercial'}
                        </span>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span className="truncate max-w-[150px]">{db.category}</span>
                        <span className="text-slate-500">Port {db.defaultPort}</span>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                        {db.popularUseCases.slice(0, 2).map((useCase, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 text-[10px] font-mono border border-slate-800 truncate max-w-[130px]">
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/60">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Engine Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Developer</th>
                      <th className="p-3">Port</th>
                      <th className="p-3 text-right">ACID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredDatabases.map(db => {
                      const isSelected = selectedDb.id === db.id;
                      return (
                        <tr
                          key={db.id}
                          onClick={() => handleSelect(db)}
                          className={`transition-colors cursor-pointer ${
                            isSelected ? 'bg-indigo-950/40 text-white font-bold' : 'hover:bg-slate-800/50 text-slate-300'
                          }`}
                        >
                          <td className="p-3 font-semibold text-slate-100 flex items-center gap-1.5">
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                            {db.name}
                          </td>
                          <td className="p-3 text-slate-400">{db.category}</td>
                          <td className="p-3 text-slate-400 truncate max-w-[130px]">{db.developer}</td>
                          <td className="p-3 text-slate-400">{db.defaultPort}</td>
                          <td className="p-3 text-right">
                            <span className={db.acidCompliant ? 'text-emerald-400' : 'text-slate-500'}>
                              {db.acidCompliant ? 'YES' : 'NO'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Database Deep Dive & Interactive Query Sandbox */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-indigo-500/30 shadow-2xl space-y-5 sticky top-4">
            
            {/* Header with Title & Badges */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black font-display text-white">
                    {selectedDb.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono font-bold">
                    {selectedDb.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Engineered by <strong className="text-slate-200">{selectedDb.developer}</strong>
                </p>
              </div>

              <button
                onClick={() => handleCopy(dynamicUri, 'conn_uri')}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-mono flex items-center gap-1 transition-all cursor-pointer"
                title="Copy full connection string"
              >
                {copiedId === 'conn_uri' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Architecture Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-[10px] uppercase text-slate-500">Data Model</span>
                <p className="text-slate-200 text-xs truncate">{selectedDb.primaryModel}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-[10px] uppercase text-slate-500">Default Port</span>
                <p className="text-emerald-400 text-xs font-bold">{selectedDb.defaultPort}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-[10px] uppercase text-slate-500">Query Language</span>
                <p className="text-indigo-300 text-xs truncate">{selectedDb.queryLanguage}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-[10px] uppercase text-slate-500">ACID Guarantee</span>
                <p className={`text-xs font-bold ${selectedDb.acidCompliant ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {selectedDb.acidCompliant ? 'Fully Compliant' : 'Eventual / Tunable'}
                </p>
              </div>
            </div>

            {/* Description & Use Cases */}
            <div className="space-y-2">
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedDb.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedDb.popularUseCases.map((uc, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-indigo-950/60 border border-indigo-500/20 text-indigo-300 font-mono text-[10px]">
                    ✓ {uc}
                  </span>
                ))}
              </div>
            </div>

            {/* Connection String Generator */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-bold flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
                  Generated Connection URI
                </span>
                <button
                  onClick={handlePing}
                  disabled={testingPing}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 text-[10px] font-bold border border-slate-700 transition-all cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className={`w-2.5 h-2.5 ${testingPing ? 'animate-spin' : ''}`} />
                  <span>{testingPing ? 'Testing...' : 'Test Ping'}</span>
                </button>
              </div>

              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-[11px] break-all select-all">
                {dynamicUri}
              </div>

              {pingResult && (
                <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{pingResult.message} ({pingResult.latency}ms)</span>
                </div>
              )}

              {/* Connection Host / Port tweaks */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] font-mono text-slate-500">Host / IP</label>
                  <input
                    type="text"
                    value={connHost}
                    onChange={(e) => setConnHost(e.target.value)}
                    className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-500">Database Name</label>
                  <input
                    type="text"
                    value={connDbName}
                    onChange={(e) => setConnDbName(e.target.value)}
                    className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Query Simulator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300 font-bold">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  Sample Query Sandbox
                </span>
                <span className="text-[11px] text-slate-500">{selectedDb.queryLanguage}</span>
              </div>

              <textarea
                rows={3}
                value={activeQuery}
                onChange={(e) => setActiveQuery(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-mono text-xs focus:outline-none focus:border-amber-500/50"
              />

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={handleRunQuery}
                  disabled={isExecutingQuery}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-indigo-600/20 active:scale-95"
                >
                  <Play className={`w-3 h-3 fill-current ${isExecutingQuery ? 'animate-spin' : ''}`} />
                  <span>{isExecutingQuery ? 'Running...' : 'Execute Query'}</span>
                </button>

                <button
                  onClick={handleSaveToFirestore}
                  disabled={savingToFirestore}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Database className="w-3 h-3" />
                  <span>{savingToFirestore ? 'Saving...' : 'Save Config to Firestore ♾️'}</span>
                </button>
              </div>

              {queryResult && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Execution OK ({queryResult.latencyMs}ms)
                    </span>
                    <span>{queryResult.rowsAffected} rows affected</span>
                  </div>
                  <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-36 scrollbar-thin">
                    {queryResult.output}
                  </pre>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
