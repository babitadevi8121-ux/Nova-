// AUTO-GENERATED: Master Global Database Engine Directory containing all 402 Database Engines
// Generated for Google AI Studio Nova AI Platform

export type DatabaseCategory = 
  | "Relational (SQL/RDBMS)"
  | "Data Warehouse & Lakehouse"
  | "Distributed NewSQL"
  | "Document Store (NoSQL)"
  | "Key-Value & In-Memory Cache"
  | "Vector & AI Search"
  | "Graph Database"
  | "Time-Series & Observability"
  | "Search & Full-Text Engine"
  | "Wide-Column & NoSQL"
  | "Embedded & In-Process DB"
  | "Serverless & Cloud BaaS";

export interface DatabaseItem {
  id: string;
  name: string;
  category: DatabaseCategory;
  primaryModel: string;
  developer: string;
  defaultPort: number | string;
  queryLanguage: string;
  uriScheme: string;
  sampleUri: string;
  sampleQuery: string;
  acidCompliant: boolean;
  openSource: boolean;
  cloudManaged: boolean;
  popularUseCases: string[];
  description: string;
  accentColor: string;
  tags: string[];
}

export const DATABASE_CATEGORIES: DatabaseCategory[] = [
  "Relational (SQL/RDBMS)",
  "Data Warehouse & Lakehouse",
  "Distributed NewSQL",
  "Document Store (NoSQL)",
  "Key-Value & In-Memory Cache",
  "Vector & AI Search",
  "Graph Database",
  "Time-Series & Observability",
  "Search & Full-Text Engine",
  "Wide-Column & NoSQL",
  "Embedded & In-Process DB",
  "Serverless & Cloud BaaS"
];

export const WORLD_DATABASES: DatabaseItem[] = [
  {
    "id": "db-1-oracle-database",
    "name": "Oracle Database",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Oracle Corporation",
    "defaultPort": 1521,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "oracle://",
    "sampleUri": "oracle://user:password@localhost:1521/oracle-database",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Oracle Database is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-2-mysql",
    "name": "MySQL",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Oracle Corporation",
    "defaultPort": 3306,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "mysql://",
    "sampleUri": "mysql://user:password@localhost:3306/mysql",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "MySQL is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-3-microsoft-sql-server",
    "name": "Microsoft SQL Server",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Microsoft",
    "defaultPort": 1433,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "mssql://",
    "sampleUri": "mssql://user:password@localhost:1433/microsoft-sql-server",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Microsoft SQL Server is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-4-postgresql",
    "name": "PostgreSQL",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "PostgreSQL Global Development Group",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/postgresql",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "PostgreSQL is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-5-mongodb",
    "name": "MongoDB",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "MongoDB Inc.",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/mongodb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "MongoDB is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-6-snowflake",
    "name": "Snowflake",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Snowflake Inc.",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/snowflake",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Snowflake is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-7-databricks",
    "name": "Databricks",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Databricks Inc.",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/databricks",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Databricks is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-8-redis",
    "name": "Redis",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Redis Ltd / Salvatore Sanfilippo",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/redis",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Redis is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-9-ibm-db2",
    "name": "IBM Db2",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "IBM",
    "defaultPort": 50000,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:50000/ibm-db2",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "IBM Db2 is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-10-sqlite",
    "name": "SQLite",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "D. Richard Hipp",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "ANSI SQL",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/sqlite.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "SQLite is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "ANSI SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-11-elasticsearch",
    "name": "Elasticsearch",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Elastic N.V.",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/elasticsearch",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Elasticsearch is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-12-apache-cassandra",
    "name": "Apache Cassandra",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "Apache Software Foundation",
    "defaultPort": 9042,
    "queryLanguage": "CQL (Cassandra Query Language)",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:9042/apache-cassandra",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "Apache Cassandra is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "CQL (Cassandra Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-13-mariadb",
    "name": "MariaDB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "MariaDB Foundation",
    "defaultPort": 3306,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:3306/mariadb",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "MariaDB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-14-splunk",
    "name": "Splunk",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Apache Software Foundation",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/splunk",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Splunk is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-15-microsoft-azure-sql-database",
    "name": "Microsoft Azure SQL Database",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Microsoft",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/microsoft-azure-sql-database",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Microsoft Azure SQL Database is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-16-apache-hive",
    "name": "Apache Hive",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/apache-hive",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Apache Hive is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-17-microsoft-access",
    "name": "Microsoft Access",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Microsoft",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/microsoft-access",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Microsoft Access is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-18-amazon-dynamodb",
    "name": "Amazon DynamoDB",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "Amazon Web Services",
    "defaultPort": 443,
    "queryLanguage": "PartiQL / SDK API",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:443/amazon-dynamodb",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "Amazon DynamoDB is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "PartiQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-19-google-cloud-firestore",
    "name": "Google Cloud Firestore",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Google",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/google-cloud-firestore",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Google Cloud Firestore is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-20-firebase-realtime-database",
    "name": "Firebase Realtime Database",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Google",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/firebase-realtime-database",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Firebase Realtime Database is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-21-couchbase",
    "name": "Couchbase",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Couchbase Inc.",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/couchbase",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "Couchbase is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-22-neo4j",
    "name": "Neo4j",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Neo4j Inc.",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "bolt://",
    "sampleUri": "bolt://user:password@localhost:7687/neo4j",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Neo4j is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-23-amazon-aurora",
    "name": "Amazon Aurora",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/amazon-aurora",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Amazon Aurora is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-24-amazon-redshift",
    "name": "Amazon Redshift",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Amazon Web Services",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/amazon-redshift",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Amazon Redshift is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-25-google-bigquery",
    "name": "Google BigQuery",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Google Cloud",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/google-bigquery",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Google BigQuery is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-26-google-cloud-spanner",
    "name": "Google Cloud Spanner",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Google Cloud",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/google-cloud-spanner",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "Google Cloud Spanner is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-27-microsoft-azure-cosmos-db",
    "name": "Microsoft Azure Cosmos DB",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "Microsoft Azure",
    "defaultPort": 443,
    "queryLanguage": "PartiQL / SDK API",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:443/microsoft-azure-cosmos-db",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "Microsoft Azure Cosmos DB is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "PartiQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-28-sap-hana",
    "name": "SAP HANA",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "SAP SE",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/sap-hana",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "SAP HANA is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-29-teradata",
    "name": "Teradata",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/teradata",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Teradata is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-30-clickhouse",
    "name": "ClickHouse",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "ClickHouse Inc.",
    "defaultPort": 8123,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "clickhouse://",
    "sampleUri": "clickhouse://user:password@localhost:8123/clickhouse",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "ClickHouse is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-31-influxdb",
    "name": "InfluxDB",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "InfluxData",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/influxdb",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "InfluxDB is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-32-duckdb",
    "name": "DuckDB",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "DuckDB Foundation",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "ANSI SQL",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/duckdb.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "DuckDB is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "ANSI SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-33-cockroachdb",
    "name": "CockroachDB",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Cockroach Labs",
    "defaultPort": 26257,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:26257/cockroachdb",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "CockroachDB is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-34-tidb",
    "name": "TiDB",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "PingCAP",
    "defaultPort": 4000,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:4000/tidb",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "TiDB is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-35-yugabytedb",
    "name": "YugabyteDB",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Yugabyte Inc.",
    "defaultPort": 5433,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5433/yugabytedb",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "YugabyteDB is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-36-singlestore",
    "name": "SingleStore",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/singlestore",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "SingleStore is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-37-firebird",
    "name": "Firebird",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/firebird",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Firebird is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-38-h2-database",
    "name": "H2 Database",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "ANSI SQL",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/h2-database.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "H2 Database is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "ANSI SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-39-hsqldb",
    "name": "HSQLDB",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/hsqldb.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "HSQLDB is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-40-apache-derby",
    "name": "Apache Derby",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/apache-derby.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "Apache Derby is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-41-apache-ignite",
    "name": "Apache Ignite",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/apache-ignite",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Apache Ignite is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-42-apache-druid",
    "name": "Apache Druid",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/apache-druid",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Apache Druid is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-43-apache-pinot",
    "name": "Apache Pinot",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/apache-pinot",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Apache Pinot is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-44-apache-solr",
    "name": "Apache Solr",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Apache Software Foundation",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/apache-solr",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Apache Solr is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-45-opensearch",
    "name": "OpenSearch",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Amazon / OpenSearch Foundation",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/opensearch",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "OpenSearch is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-46-couchdb",
    "name": "CouchDB",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Apache Software Foundation",
    "defaultPort": 5984,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:5984/couchdb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "CouchDB is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-47-ravendb",
    "name": "RavenDB",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/ravendb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "RavenDB is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-48-arangodb",
    "name": "ArangoDB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/arangodb",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "ArangoDB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-49-orientdb",
    "name": "OrientDB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/orientdb",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "OrientDB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-50-marklogic",
    "name": "MarkLogic",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/marklogic",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "MarkLogic is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-51-rethinkdb",
    "name": "RethinkDB",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/rethinkdb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "RethinkDB is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-52-couchbase-server",
    "name": "Couchbase Server",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Couchbase Inc.",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/couchbase-server",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "Couchbase Server is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-53-riak-kv",
    "name": "Riak KV",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/riak-kv",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Riak KV is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-54-aerospike",
    "name": "Aerospike",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 3000,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:3000/aerospike",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Aerospike is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-55-amazon-documentdb",
    "name": "Amazon DocumentDB",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/amazon-documentdb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "Amazon DocumentDB is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-56-amazon-neptune",
    "name": "Amazon Neptune",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Amazon Web Services",
    "defaultPort": 8182,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:8182/amazon-neptune",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Amazon Neptune is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-57-amazon-keyspaces",
    "name": "Amazon Keyspaces",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "PartiQL / SDK API",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:443/amazon-keyspaces",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "Amazon Keyspaces is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "PartiQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-58-amazon-timestream",
    "name": "Amazon Timestream",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Amazon Web Services",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/amazon-timestream",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "Amazon Timestream is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-59-amazon-memorydb",
    "name": "Amazon MemoryDB",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/amazon-memorydb",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Amazon MemoryDB is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-60-azure-table-storage",
    "name": "Azure Table Storage",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "PartiQL / SDK API",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:443/azure-table-storage",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "Azure Table Storage is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "PartiQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-61-azure-data-explorer",
    "name": "Azure Data Explorer",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/azure-data-explorer",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Azure Data Explorer is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-62-azure-synapse-analytics",
    "name": "Azure Synapse Analytics",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/azure-synapse-analytics",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Azure Synapse Analytics is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-63-azure-database-for-postgresql",
    "name": "Azure Database for PostgreSQL",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "PostgreSQL Global Development Group",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/azure-database-for-postgresql",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Azure Database for PostgreSQL is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-64-azure-database-for-mysql",
    "name": "Azure Database for MySQL",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Oracle Corporation",
    "defaultPort": 3306,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "mysql://",
    "sampleUri": "mysql://user:password@localhost:3306/azure-database-for-mysql",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Azure Database for MySQL is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-65-google-cloud-sql",
    "name": "Google Cloud SQL",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/google-cloud-sql",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Google Cloud SQL is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-66-google-alloydb",
    "name": "Google AlloyDB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/google-alloydb",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Google AlloyDB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-67-google-bigtable",
    "name": "Google Bigtable",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "Google Cloud",
    "defaultPort": 443,
    "queryLanguage": "PartiQL / SDK API",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:443/google-bigtable",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "Google Bigtable is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "PartiQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-68-google-spanner",
    "name": "Google Spanner",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Google Cloud",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/google-spanner",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "Google Spanner is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-69-google-memorystore",
    "name": "Google Memorystore",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/google-memorystore",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Google Memorystore is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-70-oracle-autonomous-database",
    "name": "Oracle Autonomous Database",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Oracle Corporation",
    "defaultPort": 1521,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "oracle://",
    "sampleUri": "oracle://user:password@localhost:1521/oracle-autonomous-database",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Oracle Autonomous Database is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-71-oracle-mysql-heatwave",
    "name": "Oracle MySQL HeatWave",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Oracle Corporation",
    "defaultPort": 3306,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "mysql://",
    "sampleUri": "mysql://user:password@localhost:3306/oracle-mysql-heatwave",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Oracle MySQL HeatWave is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-72-oracle-exadata",
    "name": "Oracle Exadata",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Oracle Corporation",
    "defaultPort": 1521,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "oracle://",
    "sampleUri": "oracle://user:password@localhost:1521/oracle-exadata",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Oracle Exadata is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-73-oracle-timesten",
    "name": "Oracle TimesTen",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Oracle Corporation",
    "defaultPort": 1521,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "oracle://",
    "sampleUri": "oracle://user:password@localhost:1521/oracle-timesten",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Oracle TimesTen is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-74-oracle-berkeley-db",
    "name": "Oracle Berkeley DB",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/oracle-berkeley-db.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "Oracle Berkeley DB is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-75-oracle-nosql-database",
    "name": "Oracle NoSQL Database",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Oracle Corporation",
    "defaultPort": 1521,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "oracle://",
    "sampleUri": "oracle://user:password@localhost:1521/oracle-nosql-database",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Oracle NoSQL Database is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-76-oracle-coherence",
    "name": "Oracle Coherence",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/oracle-coherence",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Oracle Coherence is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-77-oracle-essbase",
    "name": "Oracle Essbase",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Oracle Corporation",
    "defaultPort": 1521,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "oracle://",
    "sampleUri": "oracle://user:password@localhost:1521/oracle-essbase",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Oracle Essbase is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-78-oracle-spatial",
    "name": "Oracle Spatial",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Oracle Corporation",
    "defaultPort": 1521,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "oracle://",
    "sampleUri": "oracle://user:password@localhost:1521/oracle-spatial",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Oracle Spatial is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-79-ibm-informix",
    "name": "IBM Informix",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/ibm-informix",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "IBM Informix is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-80-ibm-ims",
    "name": "IBM IMS",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/ibm-ims",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "IBM IMS is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-81-ibm-netezza",
    "name": "IBM Netezza",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/ibm-netezza",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "IBM Netezza is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-82-ibm-cloudant",
    "name": "IBM Cloudant",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/ibm-cloudant",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "IBM Cloudant is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-83-ibm-soliddb",
    "name": "IBM solidDB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/ibm-soliddb",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "IBM solidDB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-84-ibm-filenet",
    "name": "IBM FileNet",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/ibm-filenet",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "IBM FileNet is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-85-sap-iq",
    "name": "SAP IQ",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "SAP SE",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/sap-iq",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "SAP IQ is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-86-sap-ase",
    "name": "SAP ASE",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "SAP SE",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/sap-ase",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "SAP ASE is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-87-sap-sql-anywhere",
    "name": "SAP SQL Anywhere",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "SAP SE",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/sap-sql-anywhere",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "SAP SQL Anywhere is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-88-sap-maxdb",
    "name": "SAP MaxDB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "SAP SE",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/sap-maxdb",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "SAP MaxDB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-89-sap-hana-cloud",
    "name": "SAP HANA Cloud",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "SAP SE",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/sap-hana-cloud",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "SAP HANA Cloud is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-90-teradata-vantage",
    "name": "Teradata Vantage",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/teradata-vantage",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Teradata Vantage is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-91-teradata-aster",
    "name": "Teradata Aster",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/teradata-aster",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Teradata Aster is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-92-vertica",
    "name": "Vertica",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/vertica",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Vertica is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-93-greenplum",
    "name": "Greenplum",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/greenplum",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Greenplum is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-94-actian-zen",
    "name": "Actian Zen",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/actian-zen",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Actian Zen is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-95-actian-ingres",
    "name": "Actian Ingres",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/actian-ingres",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Actian Ingres is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-96-actian-x",
    "name": "Actian X",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/actian-x",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Actian X is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-97-actian-vector",
    "name": "Actian Vector",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/actian-vector",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Actian Vector is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-98-actian-avalanche",
    "name": "Actian Avalanche",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/actian-avalanche",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Actian Avalanche is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-99-enterprisedb",
    "name": "EnterpriseDB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/enterprisedb",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "EnterpriseDB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-100-edb-postgres-advanced-server",
    "name": "EDB Postgres Advanced Server",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "PostgreSQL Global Development Group",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/edb-postgres-advanced-server",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "EDB Postgres Advanced Server is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-101-percona-server-for-mysql",
    "name": "Percona Server for MySQL",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Oracle Corporation",
    "defaultPort": 3306,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "mysql://",
    "sampleUri": "mysql://user:password@localhost:3306/percona-server-for-mysql",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Percona Server for MySQL is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-102-percona-xtradb-cluster",
    "name": "Percona XtraDB Cluster",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/percona-xtradb-cluster",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Percona XtraDB Cluster is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-103-mariadb-xpand",
    "name": "MariaDB Xpand",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "MariaDB Foundation",
    "defaultPort": 3306,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:3306/mariadb-xpand",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "MariaDB Xpand is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-104-mariadb-columnstore",
    "name": "MariaDB ColumnStore",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "MariaDB Foundation",
    "defaultPort": 3306,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:3306/mariadb-columnstore",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "MariaDB ColumnStore is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-105-vitess",
    "name": "Vitess",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/vitess",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "Vitess is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-106-planetscale",
    "name": "PlanetScale",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/planetscale",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "PlanetScale is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-107-turso",
    "name": "Turso",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/turso",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Turso is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-108-neon",
    "name": "Neon",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/neon",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Neon is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-109-supabase",
    "name": "Supabase",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Supabase Inc.",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/supabase",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Supabase is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-110-cockroachdb-serverless",
    "name": "CockroachDB Serverless",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Cockroach Labs",
    "defaultPort": 26257,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:26257/cockroachdb-serverless",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "CockroachDB Serverless is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-111-timescaledb",
    "name": "TimescaleDB",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Timescale Inc.",
    "defaultPort": 8086,
    "queryLanguage": "Timescale SQL / ANSI SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/timescaledb",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "TimescaleDB is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "Timescale SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-112-postgis",
    "name": "PostGIS",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/postgis",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "PostGIS is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-113-citus",
    "name": "Citus",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/citus",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "Citus is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-114-yugabyte",
    "name": "Yugabyte",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Yugabyte Inc.",
    "defaultPort": 5433,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5433/yugabyte",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "Yugabyte is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-115-questdb",
    "name": "QuestDB",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 9000,
    "queryLanguage": "Timescale SQL / ANSI SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9000/questdb",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "QuestDB is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "Timescale SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-116-victoriametrics",
    "name": "VictoriaMetrics",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/victoriametrics",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "VictoriaMetrics is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-117-prometheus",
    "name": "Prometheus",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "CNCF / Soundcloud",
    "defaultPort": 9090,
    "queryLanguage": "PromQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9090/prometheus",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "Prometheus is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "PromQL",
      "Open Source"
    ]
  },
  {
    "id": "db-118-m3db",
    "name": "M3DB",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/m3db",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "M3DB is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-119-tdengine",
    "name": "TDengine",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/tdengine",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "TDengine is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-120-apache-iotdb",
    "name": "Apache IoTDB",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/apache-iotdb",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "Apache IoTDB is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-121-opentsdb",
    "name": "OpenTSDB",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/opentsdb",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "OpenTSDB is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-122-graphite",
    "name": "Graphite",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/graphite",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Graphite is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-123-warp-10",
    "name": "Warp 10",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/warp-10",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "Warp 10 is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-124-dolphindb",
    "name": "DolphinDB",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/dolphindb",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "DolphinDB is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-125-greptimedb",
    "name": "GreptimeDB",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/greptimedb",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "GreptimeDB is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-126-cratedb",
    "name": "CrateDB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/cratedb",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "CrateDB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-127-apache-doris",
    "name": "Apache Doris",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/apache-doris",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Apache Doris is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-128-starrocks",
    "name": "StarRocks",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/starrocks",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "StarRocks is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-129-materialize",
    "name": "Materialize",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/materialize",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Materialize is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-130-risingwave",
    "name": "RisingWave",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/risingwave",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "RisingWave is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-131-firebolt",
    "name": "Firebolt",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/firebolt",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Firebolt is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-132-clickhouse-cloud",
    "name": "ClickHouse Cloud",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "ClickHouse Inc.",
    "defaultPort": 8123,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "clickhouse://",
    "sampleUri": "clickhouse://user:password@localhost:8123/clickhouse-cloud",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "ClickHouse Cloud is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-133-databricks-sql",
    "name": "Databricks SQL",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Databricks Inc.",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/databricks-sql",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Databricks SQL is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-134-amazon-athena",
    "name": "Amazon Athena",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Amazon Web Services",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/amazon-athena",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Amazon Athena is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-135-amazon-emr",
    "name": "Amazon EMR",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/amazon-emr",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Amazon EMR is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-136-google-dataproc",
    "name": "Google Dataproc",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/google-dataproc",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Google Dataproc is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-137-google-biglake",
    "name": "Google BigLake",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/google-biglake",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Google BigLake is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-138-azure-synapse",
    "name": "Azure Synapse",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/azure-synapse",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Azure Synapse is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-139-azure-data-lake",
    "name": "Azure Data Lake",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/azure-data-lake",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Azure Data Lake is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-140-cloudera-impala",
    "name": "Cloudera Impala",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/cloudera-impala",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Cloudera Impala is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-141-presto",
    "name": "Presto",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/presto",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Presto is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-142-trino",
    "name": "Trino",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/trino",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Trino is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-143-apache-drill",
    "name": "Apache Drill",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/apache-drill",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Apache Drill is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-144-apache-spark-sql",
    "name": "Apache Spark SQL",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/apache-spark-sql",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Apache Spark SQL is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-145-apache-flink",
    "name": "Apache Flink",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/apache-flink",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Apache Flink is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-146-apache-kylin",
    "name": "Apache Kylin",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/apache-kylin",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Apache Kylin is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-147-polars-sql",
    "name": "Polars SQL",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/polars-sql",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "Polars SQL is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-148-monetdb",
    "name": "MonetDB",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/monetdb",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "MonetDB is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-149-vectorwise",
    "name": "VectorWise",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/vectorwise",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "VectorWise is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-150-exasol",
    "name": "Exasol",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/exasol",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Exasol is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-151-yellowbrick",
    "name": "Yellowbrick",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/yellowbrick",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Yellowbrick is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-152-yellowbrick-data",
    "name": "Yellowbrick Data",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/yellowbrick-data",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Yellowbrick Data is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-153-omnisci",
    "name": "OmniSci",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/omnisci",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "OmniSci is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-154-heavyai",
    "name": "HEAVY.AI",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/heavyai",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "HEAVY.AI is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-155-memsql",
    "name": "MemSQL",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/memsql",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "MemSQL is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-156-apache-parquet",
    "name": "Apache Parquet",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/apache-parquet",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Apache Parquet is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-157-apache-orc",
    "name": "Apache ORC",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/apache-orc",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Apache ORC is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-158-leveldb",
    "name": "LevelDB",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Google",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/leveldb.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "LevelDB is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-159-rocksdb",
    "name": "RocksDB",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Meta",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/rocksdb.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "RocksDB is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-160-pebble",
    "name": "Pebble",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/pebble.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "Pebble is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-161-lmdb",
    "name": "LMDB",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/lmdb.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "LMDB is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-162-berkeley-db",
    "name": "Berkeley DB",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/berkeley-db.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "Berkeley DB is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-163-badgerdb",
    "name": "BadgerDB",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/badgerdb.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "BadgerDB is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-164-boltdb",
    "name": "BoltDB",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/boltdb.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "BoltDB is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-165-bbolt",
    "name": "bbolt",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/bbolt.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "bbolt is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-166-wiredtiger",
    "name": "WiredTiger",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/wiredtiger.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "WiredTiger is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-167-sophia",
    "name": "Sophia",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/sophia.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "Sophia is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-168-unqlite",
    "name": "UnQLite",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/unqlite.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "UnQLite is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-169-tokyo-cabinet",
    "name": "Tokyo Cabinet",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/tokyo-cabinet.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "Tokyo Cabinet is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-170-kyoto-cabinet",
    "name": "Kyoto Cabinet",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/kyoto-cabinet.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "Kyoto Cabinet is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-171-gdbm",
    "name": "GDBM",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/gdbm.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "GDBM is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-172-ndb",
    "name": "NDB",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/ndb.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "NDB is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-173-foundationdb",
    "name": "FoundationDB",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/foundationdb.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "FoundationDB is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-174-fauna",
    "name": "Fauna",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/fauna",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Fauna is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-175-dgraph",
    "name": "Dgraph",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/dgraph",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Dgraph is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-176-surrealdb",
    "name": "SurrealDB",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/surrealdb",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "SurrealDB is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-177-edgedb",
    "name": "EdgeDB",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/edgedb",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "EdgeDB is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-178-xtdb",
    "name": "XTDB",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/xtdb",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "XTDB is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-179-terminusdb",
    "name": "TerminusDB",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/terminusdb",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "TerminusDB is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-180-typedb",
    "name": "TypeDB",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/typedb",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "TypeDB is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-181-dolt",
    "name": "Dolt",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/dolt",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Dolt is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-182-pouchdb",
    "name": "PouchDB",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/pouchdb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "PouchDB is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-183-rxdb",
    "name": "RxDB",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/rxdb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "RxDB is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-184-realm",
    "name": "Realm",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/realm.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "Realm is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-185-objectbox",
    "name": "ObjectBox",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/objectbox.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "ObjectBox is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-186-objectdb",
    "name": "ObjectDB",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/objectdb.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "ObjectDB is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-187-db4o",
    "name": "db4o",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/db4o.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "db4o is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-188-versant",
    "name": "Versant",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/versant.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "Versant is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-189-objectivitydb",
    "name": "Objectivity/DB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/objectivitydb",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Objectivity/DB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-190-intersystems-iris",
    "name": "InterSystems IRIS",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/intersystems-iris",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "InterSystems IRIS is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-191-intersystems-cach",
    "name": "InterSystems Caché",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/intersystems-cach",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "InterSystems Caché is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-192-intersystems-ensemble",
    "name": "InterSystems Ensemble",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/intersystems-ensemble",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "InterSystems Ensemble is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-193-mumps",
    "name": "MUMPS",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/mumps",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "MUMPS is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-194-gtm",
    "name": "GT.M",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/gtm",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "GT.M is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-195-yottadb",
    "name": "YottaDB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/yottadb",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "YottaDB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-196-filemaker",
    "name": "FileMaker",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/filemaker",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "FileMaker is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-197-4d",
    "name": "4D",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/4d",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "4D is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-198-dbase",
    "name": "dBase",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/dbase",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "dBase is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-199-foxpro",
    "name": "FoxPro",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/foxpro",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "FoxPro is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-200-visual-foxpro",
    "name": "Visual FoxPro",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/visual-foxpro",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Visual FoxPro is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-201-paradox",
    "name": "Paradox",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/paradox",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Paradox is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-202-rbase",
    "name": "R:BASE",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/rbase",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "R:BASE is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-203-dataflex",
    "name": "DataFlex",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/dataflex",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "DataFlex is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-204-clarion",
    "name": "Clarion",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/clarion",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Clarion is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-205-alpha-anywhere",
    "name": "Alpha Anywhere",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/alpha-anywhere",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Alpha Anywhere is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-206-libreoffice-base",
    "name": "LibreOffice Base",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/libreoffice-base",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "LibreOffice Base is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-207-kexi",
    "name": "Kexi",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/kexi",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Kexi is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-208-symmetricds",
    "name": "SymmetricDS",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/symmetricds",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "SymmetricDS is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-209-h2",
    "name": "H2",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "ANSI SQL",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/h2.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "H2 is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "ANSI SQL",
      "Open Source"
    ]
  },
  {
    "id": "db-210-interbase",
    "name": "InterBase",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/interbase",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "InterBase is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-211-frontbase",
    "name": "FrontBase",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/frontbase",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "FrontBase is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-212-raima-database-manager",
    "name": "Raima Database Manager",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/raima-database-manager",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Raima Database Manager is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-213-extremedb",
    "name": "eXtremeDB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/extremedb",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "eXtremeDB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-214-empress",
    "name": "Empress",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/empress",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Empress is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-215-polyhedra",
    "name": "Polyhedra",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/polyhedra",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Polyhedra is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-216-c-treeace",
    "name": "c-treeACE",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/c-treeace",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "c-treeACE is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-217-faircom-db",
    "name": "FairCom DB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/faircom-db",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "FairCom DB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-218-nuodb",
    "name": "NuoDB",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/nuodb",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "NuoDB is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-219-clustrix",
    "name": "Clustrix",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/clustrix",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "Clustrix is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-220-voltdb",
    "name": "VoltDB",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/voltdb",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "VoltDB is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-221-h-store",
    "name": "H-Store",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/h-store",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "H-Store is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-222-ncache",
    "name": "NCache",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/ncache",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "NCache is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-223-hazelcast",
    "name": "Hazelcast",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/hazelcast",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Hazelcast is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-224-apache-geode",
    "name": "Apache Geode",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/apache-geode",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Apache Geode is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-225-gemfire",
    "name": "GemFire",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/gemfire",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "GemFire is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-226-gridgain",
    "name": "GridGain",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/gridgain",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "GridGain is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-227-infinispan",
    "name": "Infinispan",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/infinispan",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Infinispan is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-228-ehcache",
    "name": "Ehcache",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/ehcache",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Ehcache is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-229-terracotta",
    "name": "Terracotta",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/terracotta",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Terracotta is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-230-keydb",
    "name": "KeyDB",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/keydb",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "KeyDB is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-231-dragonfly",
    "name": "Dragonfly",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "DragonflyDB",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/dragonfly",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Dragonfly is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-232-valkey",
    "name": "Valkey",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Linux Foundation",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/valkey",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Valkey is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-233-memcached",
    "name": "Memcached",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 11211,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:11211/memcached",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Memcached is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-234-riak",
    "name": "Riak",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/riak",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Riak is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-235-amazon-elasticache",
    "name": "Amazon ElastiCache",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/amazon-elasticache",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Amazon ElastiCache is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-236-azure-cache-for-redis",
    "name": "Azure Cache for Redis",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Redis Ltd / Salvatore Sanfilippo",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/azure-cache-for-redis",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Azure Cache for Redis is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-237-garnet",
    "name": "Garnet",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Microsoft Research",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/garnet",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Garnet is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-238-pivotal-gemfire",
    "name": "Pivotal GemFire",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/pivotal-gemfire",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Pivotal GemFire is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-239-hazelcast-platform",
    "name": "Hazelcast Platform",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/hazelcast-platform",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Hazelcast Platform is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-240-memgraph",
    "name": "Memgraph",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Memgraph Ltd",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/memgraph",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Memgraph is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-241-tigergraph",
    "name": "TigerGraph",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "TigerGraph",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/tigergraph",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "TigerGraph is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-242-janusgraph",
    "name": "JanusGraph",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/janusgraph",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "JanusGraph is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-243-nebulagraph",
    "name": "NebulaGraph",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/nebulagraph",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "NebulaGraph is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-244-hugegraph",
    "name": "HugeGraph",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/hugegraph",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "HugeGraph is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-245-stardog",
    "name": "Stardog",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/stardog",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Stardog is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-246-allegrograph",
    "name": "AllegroGraph",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/allegrograph",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "AllegroGraph is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-247-virtuoso",
    "name": "Virtuoso",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "SPARQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/virtuoso",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Virtuoso is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "SPARQL",
      "Open Source"
    ]
  },
  {
    "id": "db-248-graphdb",
    "name": "GraphDB",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/graphdb",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "GraphDB is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-249-ontotext-graphdb",
    "name": "Ontotext GraphDB",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/ontotext-graphdb",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Ontotext GraphDB is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-250-blazegraph",
    "name": "Blazegraph",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "SPARQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/blazegraph",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Blazegraph is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "SPARQL",
      "Open Source"
    ]
  },
  {
    "id": "db-251-rdf4j",
    "name": "RDF4J",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "SPARQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/rdf4j",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "RDF4J is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "SPARQL",
      "Open Source"
    ]
  },
  {
    "id": "db-252-apache-jena-tdb",
    "name": "Apache Jena TDB",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "SPARQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/apache-jena-tdb",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Apache Jena TDB is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "SPARQL",
      "Open Source"
    ]
  },
  {
    "id": "db-253-apache-tinkerpop",
    "name": "Apache TinkerPop",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/apache-tinkerpop",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Apache TinkerPop is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-254-kzu",
    "name": "Kùzu",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/kzu",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Kùzu is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-255-falkordb",
    "name": "FalkorDB",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/falkordb",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "FalkorDB is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-256-redisgraph",
    "name": "RedisGraph",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/redisgraph",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "RedisGraph is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-257-azure-cosmos-db-for-apache-gremlin",
    "name": "Azure Cosmos DB for Apache Gremlin",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "Microsoft Azure",
    "defaultPort": 443,
    "queryLanguage": "PartiQL / SDK API",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:443/azure-cosmos-db-for-apache-gremlin",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "Azure Cosmos DB for Apache Gremlin is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "PartiQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-258-neo4j-aura",
    "name": "Neo4j Aura",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Neo4j Inc.",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "bolt://",
    "sampleUri": "bolt://user:password@localhost:7687/neo4j-aura",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Neo4j Aura is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-259-pinecone",
    "name": "Pinecone",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Pinecone Systems",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/pinecone",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Pinecone is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-260-milvus",
    "name": "Milvus",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "LF AI & Data / Zilliz",
    "defaultPort": 19530,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "tcp://",
    "sampleUri": "tcp://user:password@localhost:19530/milvus",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Milvus is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-261-qdrant",
    "name": "Qdrant",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Qdrant Solutions",
    "defaultPort": 6333,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:6333/qdrant",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Qdrant is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-262-weaviate",
    "name": "Weaviate",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Weaviate B.V.",
    "defaultPort": 8080,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:8080/weaviate",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Weaviate is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-263-chroma",
    "name": "Chroma",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Chroma DB",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/chroma",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Chroma is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-264-vespa",
    "name": "Vespa",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/vespa",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Vespa is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-265-lancedb",
    "name": "LanceDB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/lancedb",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "LanceDB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-266-faiss",
    "name": "FAISS",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Meta AI Research",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/faiss",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "FAISS is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-267-annoy",
    "name": "Annoy",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/annoy",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Annoy is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-268-hnswlib",
    "name": "Hnswlib",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/hnswlib",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Hnswlib is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-269-pgvector",
    "name": "pgvector",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/pgvector",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "pgvector is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-270-vald",
    "name": "Vald",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/vald",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Vald is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-271-marqo",
    "name": "Marqo",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/marqo",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Marqo is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-272-zilliz-cloud",
    "name": "Zilliz Cloud",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "LF AI & Data / Zilliz",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/zilliz-cloud",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Zilliz Cloud is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-273-typesense",
    "name": "Typesense",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Typesense",
    "defaultPort": 8108,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8108/typesense",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Typesense is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-274-meilisearch",
    "name": "Meilisearch",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Meilisearch",
    "defaultPort": 7700,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:7700/meilisearch",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Meilisearch is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-275-algolia",
    "name": "Algolia",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Algolia Inc.",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/algolia",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Algolia is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-276-sphinx",
    "name": "Sphinx",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Apache Software Foundation",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/sphinx",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Sphinx is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-277-manticore-search",
    "name": "Manticore Search",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Apache Software Foundation",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/manticore-search",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Manticore Search is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-278-xapian",
    "name": "Xapian",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Apache Software Foundation",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/xapian",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Xapian is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-279-lucene",
    "name": "Lucene",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Apache Software Foundation",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/lucene",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Lucene is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-280-quickwit",
    "name": "Quickwit",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Apache Software Foundation",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/quickwit",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Quickwit is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-281-zincsearch",
    "name": "ZincSearch",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Apache Software Foundation",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/zincsearch",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "ZincSearch is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-282-tantivy",
    "name": "Tantivy",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Apache Software Foundation",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/tantivy",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Tantivy is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-283-vearch",
    "name": "Vearch",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/vearch",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Vearch is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-284-infinity",
    "name": "Infinity",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/infinity",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Infinity is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-285-turbolynx",
    "name": "Turbolynx",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/turbolynx",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "Turbolynx is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-286-postgresml",
    "name": "PostgresML",
    "category": "Vector & AI Search",
    "primaryModel": "High-Dimensional Vector Embeddings",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "Vector Similarity / Cosine / L2 / HNSW",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/postgresml",
    "sampleQuery": "collection.search(query_vectors=[[0.12, -0.45, 0.89]], limit=10, metric=\"COSINE\")",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "RAG Knowledge Retrieval",
      "Semantic Search",
      "Recommendation Engines",
      "Multimodal Image Search"
    ],
    "description": "PostgresML is a battle-tested, high-performance high-dimensional vector embeddings database engine engineered for rag knowledge retrieval and enterprise data infrastructure.",
    "accentColor": "emerald",
    "tags": [
      "Vector & AI Search",
      "High-Dimensional Vector Embeddings",
      "Vector Similarity",
      "Open Source"
    ]
  },
  {
    "id": "db-287-convex",
    "name": "Convex",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Convex Inc.",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/convex",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Convex is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-288-firebase",
    "name": "Firebase",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Google",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/firebase",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Firebase is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-289-firestore",
    "name": "Firestore",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Google",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/firestore",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Firestore is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-290-appwrite-database",
    "name": "Appwrite Database",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/appwrite-database",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Appwrite Database is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-291-pocketbase",
    "name": "PocketBase",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "PocketBase OSS",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/pocketbase",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "PocketBase is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-292-nhost",
    "name": "Nhost",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/nhost",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Nhost is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-293-directus",
    "name": "Directus",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/directus",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Directus is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-294-strapi",
    "name": "Strapi",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/strapi",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Strapi is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-295-parse-server",
    "name": "Parse Server",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/parse-server",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Parse Server is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-296-hasura",
    "name": "Hasura",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/hasura",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Hasura is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-297-prisma",
    "name": "Prisma",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/prisma",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Prisma is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-298-railway-postgresql",
    "name": "Railway PostgreSQL",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "PostgreSQL Global Development Group",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/railway-postgresql",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Railway PostgreSQL is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-299-render-postgresql",
    "name": "Render PostgreSQL",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "PostgreSQL Global Development Group",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/render-postgresql",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Render PostgreSQL is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-300-heroku-postgres",
    "name": "Heroku Postgres",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "PostgreSQL Global Development Group",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/heroku-postgres",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Heroku Postgres is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-301-digitalocean-managed-databases",
    "name": "DigitalOcean Managed Databases",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/digitalocean-managed-databases",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "DigitalOcean Managed Databases is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-302-aiven",
    "name": "Aiven",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/aiven",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Aiven is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-303-neon-postgresql",
    "name": "Neon PostgreSQL",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/neon-postgresql",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Neon PostgreSQL is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-304-amazon-rds",
    "name": "Amazon RDS",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/amazon-rds",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Amazon RDS is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-305-amazon-opensearch-service",
    "name": "Amazon OpenSearch Service",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Amazon / OpenSearch Foundation",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/amazon-opensearch-service",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Amazon OpenSearch Service is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-306-google-cloud-datastore",
    "name": "Google Cloud Datastore",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/google-cloud-datastore",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Google Cloud Datastore is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-307-azure-database-for-mariadb",
    "name": "Azure Database for MariaDB",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "MariaDB Foundation",
    "defaultPort": 3306,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:3306/azure-database-for-mariadb",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Azure Database for MariaDB is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-308-oracle-cloud-autonomous-database",
    "name": "Oracle Cloud Autonomous Database",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Oracle Corporation",
    "defaultPort": 1521,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "oracle://",
    "sampleUri": "oracle://user:password@localhost:1521/oracle-cloud-autonomous-database",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Oracle Cloud Autonomous Database is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-309-ibm-db2-on-cloud",
    "name": "IBM Db2 on Cloud",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "IBM",
    "defaultPort": 50000,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:50000/ibm-db2-on-cloud",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "IBM Db2 on Cloud is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-310-cloudera",
    "name": "Cloudera",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/cloudera",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Cloudera is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-311-confluent",
    "name": "Confluent",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/confluent",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Confluent is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-312-mongodb-atlas",
    "name": "MongoDB Atlas",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "MongoDB Inc.",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/mongodb-atlas",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "MongoDB Atlas is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-313-mongodb-realm",
    "name": "MongoDB Realm",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "MongoDB Inc.",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/mongodb-realm",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "MongoDB Realm is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-314-couchbase-capella",
    "name": "Couchbase Capella",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Couchbase Inc.",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/couchbase-capella",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "Couchbase Capella is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-315-redis-cloud",
    "name": "Redis Cloud",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Redis Ltd / Salvatore Sanfilippo",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/redis-cloud",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Redis Cloud is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-316-elastic-cloud",
    "name": "Elastic Cloud",
    "category": "Search & Full-Text Engine",
    "primaryModel": "Inverted Index Full-Text Search",
    "developer": "Elastic N.V.",
    "defaultPort": 9200,
    "queryLanguage": "JSON Query DSL / Lucene Syntax / REST API",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:9200/elastic-cloud",
    "sampleQuery": "GET /articles/_search\n{ \"query\": { \"multi_match\": { \"query\": \"cyber defense\", \"fields\": [\"title^3\", \"body\"] } } }",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Site Search",
      "Fuzzy Autocomplete",
      "Log Analysis & SIEM",
      "E-Commerce Catalog Filtering"
    ],
    "description": "Elastic Cloud is a battle-tested, high-performance inverted index full-text search database engine engineered for enterprise site search and enterprise data infrastructure.",
    "accentColor": "orange",
    "tags": [
      "Search & Full-Text Engine",
      "Inverted Index Full-Text Search",
      "JSON Query DSL",
      "Open Source"
    ]
  },
  {
    "id": "db-317-singlestore-cloud",
    "name": "SingleStore Cloud",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/singlestore-cloud",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "SingleStore Cloud is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-318-cockroachdb-cloud",
    "name": "CockroachDB Cloud",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Cockroach Labs",
    "defaultPort": 26257,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:26257/cockroachdb-cloud",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "CockroachDB Cloud is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-319-upstash",
    "name": "Upstash",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/upstash",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Upstash is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-320-m3",
    "name": "M3",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/m3",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "M3 is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-321-rrdtool",
    "name": "RRDtool",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/rrdtool",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "RRDtool is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-322-kairosdb",
    "name": "KairosDB",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/kairosdb",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "KairosDB is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-323-openobserve",
    "name": "OpenObserve",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/openobserve",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "OpenObserve is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-324-loki",
    "name": "Loki",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/loki",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "Loki is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-325-tempo",
    "name": "Tempo",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/tempo",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "Tempo is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-326-jaeger",
    "name": "Jaeger",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/jaeger",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "Jaeger is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-327-zipkin",
    "name": "Zipkin",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/zipkin",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "Zipkin is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-328-apache-impala",
    "name": "Apache Impala",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/apache-impala",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Apache Impala is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-329-apache-beam",
    "name": "Apache Beam",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/apache-beam",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Apache Beam is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-330-apache-hadoop",
    "name": "Apache Hadoop",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/apache-hadoop",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Apache Hadoop is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-331-hbase",
    "name": "HBase",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "PartiQL / SDK API",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:443/hbase",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "HBase is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "PartiQL",
      "Open Source"
    ]
  },
  {
    "id": "db-332-accumulo",
    "name": "Accumulo",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "PartiQL / SDK API",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:443/accumulo",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "Accumulo is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "PartiQL",
      "Open Source"
    ]
  },
  {
    "id": "db-333-cassandra",
    "name": "Cassandra",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "Apache Software Foundation",
    "defaultPort": 9042,
    "queryLanguage": "CQL (Cassandra Query Language)",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:9042/cassandra",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "Cassandra is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "CQL (Cassandra Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-334-scylladb",
    "name": "ScyllaDB",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "ScyllaDB Inc.",
    "defaultPort": 9042,
    "queryLanguage": "CQL (Cassandra Query Language)",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:9042/scylladb",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "ScyllaDB is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "CQL (Cassandra Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-335-apache-kudu",
    "name": "Apache Kudu",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/apache-kudu",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Apache Kudu is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-336-apache-ozone",
    "name": "Apache Ozone",
    "category": "Data Warehouse & Lakehouse",
    "primaryModel": "Columnar Storage / Massively Parallel Processing (MPP)",
    "developer": "Apache Software Foundation",
    "defaultPort": 443,
    "queryLanguage": "ANSI SQL / Spark SQL / Presto / Trino",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/apache-ozone",
    "sampleQuery": "SELECT date_trunc(\"month\", timestamp) AS month, sum(revenue) FROM transactions GROUP BY 1 ORDER BY 1 DESC",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "Enterprise Business Intelligence",
      "Massive Scale Analytics",
      "ETL/ELT Lakehouse Pipelines",
      "Executive Dashboards"
    ],
    "description": "Apache Ozone is a battle-tested, high-performance columnar storage / massively parallel processing (mpp) database engine engineered for enterprise business intelligence and enterprise data infrastructure.",
    "accentColor": "amber",
    "tags": [
      "Data Warehouse & Lakehouse",
      "Columnar Storage / Massively Parallel Processing (MPP)",
      "ANSI SQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-337-ferretdb",
    "name": "FerretDB",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/ferretdb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "FerretDB is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-338-litedb",
    "name": "LiteDB",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/litedb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "LiteDB is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-339-nitrite",
    "name": "Nitrite",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/nitrite",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "Nitrite is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-340-mingo",
    "name": "Mingo",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/mingo",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "Mingo is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-341-sled",
    "name": "Sled",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/sled.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "Sled is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-342-pickledb",
    "name": "PickleDB",
    "category": "Embedded & In-Process DB",
    "primaryModel": "In-Process Embedded Engine / Serverless Local",
    "developer": "Open Source Community",
    "defaultPort": "In-Process (No Network Port)",
    "queryLanguage": "C/C++/Rust/Java Native API",
    "uriScheme": "file://",
    "sampleUri": "file:///path/to/pickledb.db",
    "sampleQuery": "SELECT symbol, avg(price) FROM read_parquet(\"market_data/*.parquet\") GROUP BY 1",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Client-Side Mobile Apps (iOS/Android)",
      "Local Desktop Software",
      "Data Science & In-Memory Analysis",
      "Embedded IoT Firmware"
    ],
    "description": "PickleDB is a battle-tested, high-performance in-process embedded engine / serverless local database engine engineered for client-side mobile apps (ios/android) and enterprise data infrastructure.",
    "accentColor": "teal",
    "tags": [
      "Embedded & In-Process DB",
      "In-Process Embedded Engine / Serverless Local",
      "C",
      "Open Source"
    ]
  },
  {
    "id": "db-343-tinydb",
    "name": "TinyDB",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/tinydb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "TinyDB is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-344-nedb",
    "name": "NeDB",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/nedb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "NeDB is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-345-lokijs",
    "name": "LokiJS",
    "category": "Time-Series & Observability",
    "primaryModel": "Time-Indexed Metrics, Events & Telemetry",
    "developer": "Open Source Community",
    "defaultPort": 8086,
    "queryLanguage": "InfluxQL / Flux / SQL",
    "uriScheme": "http://",
    "sampleUri": "http://user:password@localhost:8086/lokijs",
    "sampleQuery": "SELECT mean(\"cpu_usage\") FROM \"system_metrics\" WHERE time >= now() - 1h GROUP BY time(5m)",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "IoT Sensor Telemetry",
      "Server Infrastructure Monitoring",
      "Financial Tick Data",
      "Distributed Tracing"
    ],
    "description": "LokiJS is a battle-tested, high-performance time-indexed metrics, events & telemetry database engine engineered for iot sensor telemetry and enterprise data infrastructure.",
    "accentColor": "cyan",
    "tags": [
      "Time-Series & Observability",
      "Time-Indexed Metrics, Events & Telemetry",
      "InfluxQL",
      "Open Source"
    ]
  },
  {
    "id": "db-346-lowdb",
    "name": "Lowdb",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/lowdb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "Lowdb is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-347-tingodb",
    "name": "TingoDB",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Open Source Community",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/tingodb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "TingoDB is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-348-mongolite",
    "name": "MongoLite",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "MongoDB Inc.",
    "defaultPort": 27017,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:27017/mongolite",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "MongoLite is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-349-gemstones",
    "name": "GemStone/S",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/gemstones",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "GemStone/S is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-350-gemstone",
    "name": "GemStone",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/gemstone",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "GemStone is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-351-eclipselink",
    "name": "EclipseLink",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/eclipselink",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "EclipseLink is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-352-hibernate",
    "name": "Hibernate",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/hibernate",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Hibernate is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-353-hibernate-ogm",
    "name": "Hibernate OGM",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/hibernate-ogm",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Hibernate OGM is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-354-apache-openjpa",
    "name": "Apache OpenJPA",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/apache-openjpa",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Apache OpenJPA is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-355-datanucleus",
    "name": "DataNucleus",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/datanucleus",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "DataNucleus is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-356-jdo",
    "name": "JDO",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/jdo",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "JDO is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-357-jena",
    "name": "Jena",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "SPARQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/jena",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Jena is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "SPARQL",
      "Open Source"
    ]
  },
  {
    "id": "db-358-sesame",
    "name": "Sesame",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/sesame",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Sesame is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-359-4store",
    "name": "4store",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/4store",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "4store is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-360-kineograph",
    "name": "Kineograph",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/kineograph",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Kineograph is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-361-graph-engine",
    "name": "Graph Engine",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/graph-engine",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Graph Engine is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-362-infinitegraph",
    "name": "InfiniteGraph",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/infinitegraph",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "InfiniteGraph is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-363-infogrid",
    "name": "InfoGrid",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/infogrid",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "InfoGrid is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-364-hypergraphdb",
    "name": "HyperGraphDB",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/hypergraphdb",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "HyperGraphDB is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-365-hypergraph",
    "name": "HyperGraph",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/hypergraph",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "HyperGraph is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-366-flockdb",
    "name": "FlockDB",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/flockdb",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "FlockDB is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-367-datomic",
    "name": "Datomic",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/datomic",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Datomic is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-368-datascript",
    "name": "DataScript",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/datascript",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "DataScript is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-369-crux",
    "name": "Crux",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/crux",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Crux is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-370-clojurescript",
    "name": "ClojureScript",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/clojurescript",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "ClojureScript is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-371-cayley",
    "name": "Cayley",
    "category": "Graph Database",
    "primaryModel": "Labeled Property Graph / RDF TripleStore",
    "developer": "Apache / Open Source Community",
    "defaultPort": 7687,
    "queryLanguage": "Cypher / Gremlin / GQL",
    "uriScheme": "gremlin://",
    "sampleUri": "gremlin://user:password@localhost:7687/cayley",
    "sampleQuery": "MATCH (u:User)-[:FOLLOWS]->(f:User) WHERE u.id = $id RETURN f.name, f.avatar LIMIT 25",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Social Networks",
      "Fraud Detection Networks",
      "Knowledge Graphs",
      "Identity & Access Topology"
    ],
    "description": "Cayley is a battle-tested, high-performance labeled property graph / rdf triplestore database engine engineered for social networks and enterprise data infrastructure.",
    "accentColor": "purple",
    "tags": [
      "Graph Database",
      "Labeled Property Graph / RDF TripleStore",
      "Cypher",
      "Open Source"
    ]
  },
  {
    "id": "db-372-gun",
    "name": "Gun",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/gun",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Gun is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-373-orbitdb",
    "name": "OrbitDB",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/orbitdb",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "OrbitDB is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-374-ipfs-datastore",
    "name": "IPFS Datastore",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/ipfs-datastore",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "IPFS Datastore is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-375-ceramic",
    "name": "Ceramic",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/ceramic",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Ceramic is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-376-textile",
    "name": "Textile",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/textile",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Textile is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-377-gunjs",
    "name": "Gun.js",
    "category": "Serverless & Cloud BaaS",
    "primaryModel": "Serverless Backend-as-a-Service / Edge DB",
    "developer": "Open Source Community",
    "defaultPort": 443,
    "queryLanguage": "REST / Realtime WebSockets / GraphQL / SDK",
    "uriScheme": "https://",
    "sampleUri": "https://user:password@localhost:443/gunjs",
    "sampleQuery": "const doc = await db.collection(\"users\").doc(userId).get();",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": true,
    "popularUseCases": [
      "Rapid Full-Stack Prototypes",
      "Real-Time Collaborative Apps",
      "Serverless Edge Functions",
      "Mobile App Backends"
    ],
    "description": "Gun.js is a battle-tested, high-performance serverless backend-as-a-service / edge db database engine engineered for rapid full-stack prototypes and enterprise data infrastructure.",
    "accentColor": "yellow",
    "tags": [
      "Serverless & Cloud BaaS",
      "Serverless Backend-as-a-Service / Edge DB",
      "REST",
      "Open Source"
    ]
  },
  {
    "id": "db-378-apache-couchdb",
    "name": "Apache CouchDB",
    "category": "Document Store (NoSQL)",
    "primaryModel": "Document-Oriented (JSON/BSON)",
    "developer": "Apache Software Foundation",
    "defaultPort": 5984,
    "queryLanguage": "MongoDB Query Language (MQL) / JSON",
    "uriScheme": "mongodb://",
    "sampleUri": "mongodb://user:password@localhost:5984/apache-couchdb",
    "sampleQuery": "db.customers.find({ status: \"active\", tier: \"enterprise\" }).sort({ createdAt: -1 })",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Dynamic Content Management",
      "Customer 360 Profiles",
      "Catalog Management",
      "Mobile Backend Sync"
    ],
    "description": "Apache CouchDB is a battle-tested, high-performance document-oriented (json/bson) database engine engineered for dynamic content management and enterprise data infrastructure.",
    "accentColor": "green",
    "tags": [
      "Document Store (NoSQL)",
      "Document-Oriented (JSON/BSON)",
      "MongoDB Query Language (MQL)",
      "Open Source"
    ]
  },
  {
    "id": "db-379-bigtable",
    "name": "Bigtable",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "Google Cloud",
    "defaultPort": 443,
    "queryLanguage": "PartiQL / SDK API",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:443/bigtable",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "Bigtable is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "PartiQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-380-dynamodb",
    "name": "DynamoDB",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "Amazon Web Services",
    "defaultPort": 443,
    "queryLanguage": "PartiQL / SDK API",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:443/dynamodb",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "DynamoDB is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "PartiQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-381-cosmos-db",
    "name": "Cosmos DB",
    "category": "Wide-Column & NoSQL",
    "primaryModel": "Wide-Column Family / Partitioned Key-Value",
    "developer": "Microsoft Azure",
    "defaultPort": 443,
    "queryLanguage": "PartiQL / SDK API",
    "uriScheme": "cassandra://",
    "sampleUri": "cassandra://user:password@localhost:443/cosmos-db",
    "sampleQuery": "SELECT user_id, event_time, payload FROM audit_logs WHERE user_id = ? AND event_time > ?",
    "acidCompliant": true,
    "openSource": false,
    "cloudManaged": true,
    "popularUseCases": [
      "High-Write Heavy Telemetry",
      "User Activity Timelines",
      "Messaging Metadata",
      "Distributed Event Sinks"
    ],
    "description": "Cosmos DB is a battle-tested, high-performance wide-column family / partitioned key-value database engine engineered for high-write heavy telemetry and enterprise data infrastructure.",
    "accentColor": "indigo",
    "tags": [
      "Wide-Column & NoSQL",
      "Wide-Column Family / Partitioned Key-Value",
      "PartiQL",
      "Commercial/Managed"
    ]
  },
  {
    "id": "db-382-tarantool",
    "name": "Tarantool",
    "category": "Key-Value & In-Memory Cache",
    "primaryModel": "In-Memory Key-Value / Low-Latency Cache",
    "developer": "Open Source Community",
    "defaultPort": 6379,
    "queryLanguage": "RESP (Redis Serialization Protocol) / KV Commands",
    "uriScheme": "redis://",
    "sampleUri": "redis://user:password@localhost:6379/tarantool",
    "sampleQuery": "SET session:user_9810 \"active\" EX 3600\nHGETALL user:profile:102",
    "acidCompliant": false,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Sub-Millisecond Session Caching",
      "Real-Time Leaderboards",
      "Pub/Sub Message Queues",
      "Rate Limiting"
    ],
    "description": "Tarantool is a battle-tested, high-performance in-memory key-value / low-latency cache database engine engineered for sub-millisecond session caching and enterprise data infrastructure.",
    "accentColor": "rose",
    "tags": [
      "Key-Value & In-Memory Cache",
      "In-Memory Key-Value / Low-Latency Cache",
      "RESP (Redis Serialization Protocol)",
      "Open Source"
    ]
  },
  {
    "id": "db-383-cubrid",
    "name": "CUBRID",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/cubrid",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "CUBRID is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-384-altibase",
    "name": "Altibase",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/altibase",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Altibase is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-385-tibero",
    "name": "Tibero",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/tibero",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Tibero is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-386-tmaxsql",
    "name": "TmaxSQL",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/tmaxsql",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "TmaxSQL is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-387-kingbasees",
    "name": "KingbaseES",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/kingbasees",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "KingbaseES is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-388-oceanbase",
    "name": "OceanBase",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Ant Group / Alibaba",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/oceanbase",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "OceanBase is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-389-gaussdb",
    "name": "GaussDB",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/gaussdb",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "GaussDB is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-390-dameng",
    "name": "Dameng",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/dameng",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "Dameng is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-391-polardb",
    "name": "PolarDB",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/polardb",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "PolarDB is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-392-greatsql",
    "name": "GreatSQL",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/greatsql",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "GreatSQL is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-393-opengauss",
    "name": "openGauss",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/opengauss",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "openGauss is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-394-sequoiadb",
    "name": "SequoiaDB",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/sequoiadb",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "SequoiaDB is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-395-tdsql",
    "name": "TDSQL",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/tdsql",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "TDSQL is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-396-gbase",
    "name": "GBase",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/gbase",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "GBase is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-397-hologres",
    "name": "Hologres",
    "category": "Relational (SQL/RDBMS)",
    "primaryModel": "Relational Tabular (ACID)",
    "developer": "Enterprise / Open Source",
    "defaultPort": 5432,
    "queryLanguage": "SQL (Structured Query Language)",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/hologres",
    "sampleQuery": "SELECT id, name, email, created_at FROM users WHERE status = active ORDER BY created_at DESC LIMIT 50;",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Transactional Web Applications",
      "Enterprise ERP & CRM",
      "Financial Ledger Tracking",
      "Relational Master Data"
    ],
    "description": "Hologres is a battle-tested, high-performance relational tabular (acid) database engine engineered for transactional web applications and enterprise data infrastructure.",
    "accentColor": "sky",
    "tags": [
      "Relational (SQL/RDBMS)",
      "Relational Tabular (ACID)",
      "SQL (Structured Query Language)",
      "Open Source"
    ]
  },
  {
    "id": "db-398-yashandb",
    "name": "YashanDB",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/yashandb",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "YashanDB is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-399-db-399",
    "name": "人大金仓",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/db-399",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "人大金仓 is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-400-db-400",
    "name": "达梦数据库",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/db-400",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "达梦数据库 is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-401-db-401",
    "name": "神舟通用",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/db-401",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "神舟通用 is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  },
  {
    "id": "db-402-kingbase",
    "name": "人大金仓 Kingbase",
    "category": "Distributed NewSQL",
    "primaryModel": "Distributed Relational / Raft Consensus ACID",
    "developer": "Open Source Community",
    "defaultPort": 5432,
    "queryLanguage": "PostgreSQL Wire / MySQL Compatible SQL",
    "uriScheme": "postgresql://",
    "sampleUri": "postgresql://user:password@localhost:5432/kingbase",
    "sampleQuery": "SELECT account_id, balance FROM accounts WHERE region = \"ap-south-1\" FOR UPDATE",
    "acidCompliant": true,
    "openSource": true,
    "cloudManaged": false,
    "popularUseCases": [
      "Global Multi-Region Financial Transactions",
      "High-Availability Core Banking",
      "Zero-Downtime Horizontal Scaling"
    ],
    "description": "人大金仓 Kingbase is a battle-tested, high-performance distributed relational / raft consensus acid database engine engineered for global multi-region financial transactions and enterprise data infrastructure.",
    "accentColor": "blue",
    "tags": [
      "Distributed NewSQL",
      "Distributed Relational / Raft Consensus ACID",
      "PostgreSQL Wire",
      "Open Source"
    ]
  }
];

export function getDatabaseById(id: string): DatabaseItem | undefined {
  return WORLD_DATABASES.find(db => db.id === id || db.name.toLowerCase() === id.toLowerCase());
}

export function filterDatabasesByCategory(category: DatabaseCategory): DatabaseItem[] {
  return WORLD_DATABASES.filter(db => db.category === category);
}

export function searchDatabases(term: string): DatabaseItem[] {
  if (!term) return WORLD_DATABASES;
  const q = term.toLowerCase().trim();
  return WORLD_DATABASES.filter(db => 
    db.name.toLowerCase().includes(q) ||
    db.category.toLowerCase().includes(q) ||
    db.developer.toLowerCase().includes(q) ||
    db.primaryModel.toLowerCase().includes(q) ||
    db.queryLanguage.toLowerCase().includes(q) ||
    db.tags.some(t => t.toLowerCase().includes(q))
  );
}
