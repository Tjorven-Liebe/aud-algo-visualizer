// Canonical Educational Datasets & Graph Target Path Finder Engine

export const ALGORITHM_DATA = {
  // P1: SORTIERALGORITHMEN
  hybridsort: {
    name: "⭐ HybridSort (Quick + MergeSort)",
    category: "sort",
    isTestat: true,
    file: "HybridSort.java",
    code: [
      "public void quickSort(SortList<T> list, int left, int right, int depth) {",
      "    if (left >= right) return;",
      "    if (depth >= this.k) {",
      "        this.mergeSort(list, left, right); // Tiefe k erreicht -> Umschalten",
      "        return;",
      "    }",
      "    int p = this.partition(list, left, right); // Hoare-Partitionierung",
      "    this.quickSort(list, left, p, depth + 1);",
      "    this.quickSort(list, p + 1, right, depth + 1);",
      "}"
    ]
  },
  radixsort: {
    name: "⭐ RadixSort (LSD Bucket Sort)",
    category: "sort",
    isTestat: true,
    file: "RadixSort.java",
    code: [
      "public void sort(SortList<T> sortList) {",
      "    for (int i = 0; i < maxInputLength; i++) {",
      "        for (int j = 0; j < n; j++) putBucket(sortList.get(j), i);",
      "        int idx = 0;",
      "        for (Bucket<T> b : buckets) {",
      "            while (!b.isEmpty()) sortList.set(idx++, b.remove());",
      "        }",
      "    }",
      "}"
    ]
  },
  quicksort: {
    name: "QuickSort (Hoare-Partitioning - CLRS Kap. 7)",
    category: "sort",
    isTestat: false,
    file: "QuickSort.java",
    code: [
      "public void quickSort(int[] arr, int p, int r) {",
      "    if (p < r) {",
      "        int q = partition(arr, p, r); // Hoare Pivot",
      "        quickSort(arr, p, q);",
      "        quickSort(arr, q + 1, r);",
      "    }",
      "}"
    ]
  },
  mergesort: {
    name: "MergeSort (Divide & Conquer - CLRS Kap. 2)",
    category: "sort",
    isTestat: false,
    file: "MergeSort.java",
    code: [
      "public void mergeSort(int[] arr, int l, int r) {",
      "    if (l < r) {",
      "        int m = (l + r) / 2;",
      "        mergeSort(arr, l, m);",
      "        mergeSort(arr, m + 1, r);",
      "        merge(arr, l, m, r); // O(n) Hilfsarray",
      "    }",
      "}"
    ]
  },
  heapsort: {
    name: "HeapSort (Max-Heapify - CLRS Kap. 6)",
    category: "sort",
    isTestat: false,
    file: "HeapSort.java",
    code: [
      "public void heapSort(int[] arr) {",
      "    buildMaxHeap(arr);",
      "    for (int i = arr.length - 1; i > 0; i--) {",
      "        swap(arr, 0, i); // Wurzel nach hinten",
      "        maxHeapify(arr, 0, i);",
      "    }",
      "}"
    ]
  },
  insertionsort: {
    name: "InsertionSort (CLRS Kap. 2)",
    category: "sort",
    isTestat: false,
    file: "InsertionSort.java",
    code: [
      "public void insertionSort(int[] arr) {",
      "    for (int j = 1; j < arr.length; j++) {",
      "        int key = arr[j]; int i = j - 1;",
      "        while (i >= 0 && arr[i] > key) {",
      "            arr[i + 1] = arr[i]; i--;",
      "        }",
      "        arr[i + 1] = key;",
      "    }",
      "}"
    ]
  },
  countingsort: {
    name: "CountingSort (Nicht-vergleichsbasiert - CLRS Kap. 8)",
    category: "sort",
    isTestat: false,
    file: "CountingSort.java",
    code: [
      "public int[] countingSort(int[] A, int k) {",
      "    int[] C = new int[k + 1];",
      "    for (int j = 0; j < A.length; j++) C[A[j]]++;",
      "    for (int i = 1; i <= k; i++) C[i] += C[i - 1];",
      "    for (int j = A.length - 1; j >= 0; j--) B[--C[A[j]]] = A[j];",
      "}"
    ]
  },

  // P2: BAUMNAVIGATION & BALANCIERUNG
  avl: {
    name: "⭐ AVL-Baum (USFCA Galles Rotationen)",
    category: "tree",
    isTestat: true,
    file: "AVLTree.java",
    code: [
      "private AVLNode<T> buildAVLTree(List<T> list, int start, int end) {",
      "    if (start > end) return null;",
      "    int mid = start + (end - start) / 2;",
      "    AVLNode<T> node = createNode(list.get(mid));",
      "    node.setLeft(buildAVLTree(list, start, mid - 1));",
      "    node.setRight(buildAVLTree(list, mid + 1, end));",
      "    updateHeight(node); // Balance-Kriterium: |h_L - h_R| <= 1",
      "    return node;",
      "}"
    ]
  },
  splay: {
    name: "⭐ Splay-Baum (Zig / Zig-Zig Rotationen)",
    category: "tree",
    isTestat: true,
    file: "SplayTree.java",
    code: [
      "public void splay(SplayNode<T> node) {",
      "    while (node.getParent() != null) {",
      "        if (node.getParent().getParent() == null) rotate(node); // Zig",
      "        else if (isZigZig(node)) { rotate(parent); rotate(node); } // Zig-Zig",
      "        else { rotate(node); rotate(node); } // Zig-Zag",
      "    }",
      "}"
    ]
  },
  rbtree: {
    name: "⭐ Rot-Schwarz-Baum (4 Regeln & Farben)",
    category: "tree",
    isTestat: true,
    file: "RBTreeChecker.java",
    code: [
      "public static void checkAllRules(RBTree<?> rbTree) {",
      "    checkRule1(rbTree); // Regel 1: Knoten ist ROT oder SCHWARZ",
      "    checkRule2(rbTree); // Regel 2: Wurzel ist SCHWARZ",
      "    checkRule3(rbTree); // Regel 3: Keine zwei roten Knoten aufeinander",
      "    checkRule4(rbTree); // Regel 4: Gleiche Schwarzhöhe auf allen Pfaden",
      "}"
    ]
  },
  bst: {
    name: "Binärer Suchbaum - BST (CLRS Kap. 12)",
    category: "tree",
    isTestat: false,
    file: "BinarySearchTree.java",
    code: [
      "public void insert(Node node, int val) {",
      "    if (val < node.val) {",
      "        if (node.left == null) node.left = new Node(val);",
      "        else insert(node.left, val);",
      "    } else {",
      "        if (node.right == null) node.right = new Node(val);",
      "        else insert(node.right, val);",
      "    }",
      "}"
    ]
  },
  heap: {
    name: "Max-Heap / PriorityQueue (CLRS Kap. 6)",
    category: "tree",
    isTestat: false,
    file: "MaxHeap.java",
    code: [
      "public void insert(int key) {",
      "    heap.add(key);",
      "    heapifyUp(heap.size() - 1); // Elter-Vergleich (i-1)/2",
      "}"
    ]
  },

  // P3: GRAPHEN & NETZWERKE
  dijkstra: {
    name: "⭐ Dijkstra (Kürzeste Pfade)",
    category: "graph",
    isTestat: true,
    file: "DijkstraPathCalculator.java",
    code: [
      "public void calculatePaths(G node) {",
      "    dist[node] = 0; pq.add(node);",
      "    while (!pq.isEmpty()) {",
      "        U u = pq.poll();",
      "        for (Edge e : u.edges()) {",
      "            if (dist[u] + e.w < dist[e.target]) { // Relaxation",
      "                dist[e.target] = dist[u] + e.w;",
      "                pq.add(e.target);",
      "            }",
      "        }",
      "    }",
      "}"
    ]
  },
  bellmanford: {
    name: "⭐ Bellman-Ford (Negativzyklus-Check)",
    category: "graph",
    isTestat: true,
    file: "BellmanFordPathCalculator.java",
    code: [
      "for (int i = 1; i < V; i++) { // V-1 Runden",
      "    for (Edge e : edges) relax(e);",
      "}",
      "for (Edge e : edges) { // 10. Runde: Negativer Zyklus Check",
      "    if (dist[e.u] + e.w < dist[e.v]) throw new CycleException();",
      "}"
    ]
  },
  kruskal: {
    name: "⭐ Kruskal (MST & Union-Find)",
    category: "graph",
    isTestat: true,
    file: "KruskalSolver.java",
    code: [
      "edges.sort(Comparator.comparingInt(Edge::getWeight));",
      "DisjointSet ds = new DisjointSet(V);",
      "for (Edge e : edges) {",
      "    if (ds.find(e.u) != ds.find(e.v)) { // Kreis-Check",
      "        ds.union(e.u, e.v); mst.add(e);",
      "    }",
      "}"
    ]
  },
  prim: {
    name: "Prim-Algorithmus (MST Greedy Growth - CLRS Kap. 23)",
    category: "graph",
    isTestat: false,
    file: "PrimMST.java",
    code: [
      "public void prim(Graph g, Node start) {",
      "    pq.add(start); key[start] = 0;",
      "    while (!pq.isEmpty()) {",
      "        Node u = pq.poll(); inMST.add(u);",
      "        for (Edge e : u.adj) {",
      "            if (!inMST.contains(e.v) && e.w < key[e.v]) {",
      "                key[e.v] = e.w; parent[e.v] = u; pq.add(e.v);",
      "            }",
      "        }",
      "    }",
      "}"
    ]
  },
  bfs: {
    name: "Breitensuche - BFS (Breadth-First Search - CLRS Kap. 22)",
    category: "graph",
    isTestat: false,
    file: "BreadthFirstSearch.java",
    code: [
      "public void bfs(Graph g, Node s) {",
      "    Queue<Node> q = new LinkedList<>();",
      "    q.add(s); visited.add(s);",
      "    while (!q.isEmpty()) {",
      "        Node u = q.poll();",
      "        for (Node v : u.neighbors) {",
      "            if (!visited.contains(v)) { visited.add(v); q.add(v); }",
      "        }",
      "    }",
      "}"
    ]
  },
  dfs: {
    name: "Tiefensuche - DFS (Depth-First Search - CLRS Kap. 22)",
    category: "graph",
    isTestat: false,
    file: "DepthFirstSearch.java",
    code: [
      "public void dfs(Node u) {",
      "    visited.add(u); time++; discoveryTime[u] = time;",
      "    for (Node v : u.neighbors) {",
      "        if (!visited.contains(v)) dfs(v);",
      "    }",
      "    time++; finishTime[u] = time;",
      "}"
    ]
  }
};

export function getDefaultData(algoKey) {
  switch (algoKey) {
    case 'hybridsort':
    case 'quicksort':
    case 'mergesort':
    case 'heapsort':
    case 'insertionsort':
      return [45, 12, 89, 34, 67, 23, 90, 11, 56];
    case 'radixsort':
    case 'countingsort':
      return [170, 45, 75, 90, 802, 24, 2, 66];
    case 'avl':
    case 'splay':
    case 'rbtree':
    case 'bst':
    case 'heap':
      return [40, 20, 60, 10, 30, 25];
    case 'dijkstra':
    case 'bellmanford':
    case 'kruskal':
    case 'prim':
    case 'bfs':
    case 'dfs':
      return {
        nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
        edges: [
          { u: 'A', v: 'B', w: 4 },
          { u: 'A', v: 'C', w: 2 },
          { u: 'B', v: 'C', w: 1 },
          { u: 'B', v: 'D', w: 5 },
          { u: 'C', v: 'D', w: 8 },
          { u: 'C', v: 'E', w: 10 },
          { u: 'D', v: 'E', w: 2 },
          { u: 'D', v: 'F', w: 6 },
          { u: 'E', v: 'F', w: 3 }
        ]
      };
    default:
      return [40, 20, 60, 10, 30, 25];
  }
}

// Truly Random Dataset Generator
export function generateRandomData(category) {
  if (category === 'sort') {
    const size = Math.floor(Math.random() * 7) + 6;
    return Array.from({ length: size }, () => Math.floor(Math.random() * 88) + 11);
  } else if (category === 'tree') {
    const size = Math.floor(Math.random() * 4) + 6;
    const set = new Set();
    while (set.size < size) {
      set.add(Math.floor(Math.random() * 88) + 11);
    }
    return Array.from(set);
  } else if (category === 'graph') {
    const allLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const nodeCount = Math.floor(Math.random() * 2) + 5;
    const nodes = allLabels.slice(0, nodeCount);
    const startNode = nodes[0];
    const targetNode = nodes[nodes.length - 1];

    const possiblePairs = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if ((nodes[i] === startNode && nodes[j] === targetNode) ||
            (nodes[i] === targetNode && nodes[j] === startNode)) {
          continue;
        }
        possiblePairs.push({ u: nodes[i], v: nodes[j] });
      }
    }

    possiblePairs.sort(() => Math.random() - 0.5);
    const edgeCount = Math.min(possiblePairs.length, nodeCount + Math.floor(Math.random() * 2) + 1);
    const edges = possiblePairs.slice(0, edgeCount).map(pair => ({
      ...pair,
      w: Math.floor(Math.random() * 14) + 1
    }));

    return { nodes, edges };
  }
}

// ADVANCED EXAM-LEVEL DATASET GENERATOR
export function generateAdvancedExamData(category, algoKey) {
  if (category === 'sort') {
    if (algoKey === 'radixsort' || algoKey === 'countingsort') {
      return [904, 23, 812, 45, 904, 170, 802, 66, 24, 75, 45];
    }
    return [88, 12, 45, 12, 99, 34, 67, 12, 90, 23, 11, 45, 88];
  } else if (category === 'tree') {
    if (algoKey === 'avl') {
      return [50, 20, 80, 10, 35, 28, 38, 70, 90, 65, 68];
    } else if (algoKey === 'splay') {
      return [10, 20, 30, 40, 50, 60, 35, 25];
    } else {
      return [60, 30, 80, 15, 45, 70, 90, 20, 40, 35];
    }
  } else if (category === 'graph') {
    const nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    if (algoKey === 'bellmanford') {
      return {
        nodes,
        edges: [
          { u: 'A', v: 'B', w: 5 }, { u: 'A', v: 'C', w: 3 },
          { u: 'B', v: 'D', w: 4 }, { u: 'C', v: 'D', w: -2 },
          { u: 'C', v: 'E', w: 6 }, { u: 'D', v: 'E', w: 1 },
          { u: 'D', v: 'F', w: 3 }, { u: 'E', v: 'G', w: -1 },
          { u: 'F', v: 'G', w: 2 }
        ]
      };
    }

    return {
      nodes,
      edges: [
        { u: 'A', v: 'B', w: 7 }, { u: 'A', v: 'C', w: 3 },
        { u: 'B', v: 'C', w: 2 }, { u: 'B', v: 'D', w: 6 },
        { u: 'C', v: 'D', w: 8 }, { u: 'C', v: 'E', w: 4 },
        { u: 'D', v: 'E', w: 1 }, { u: 'D', v: 'F', w: 5 },
        { u: 'E', v: 'F', w: 2 }, { u: 'E', v: 'G', w: 9 },
        { u: 'F', v: 'G', w: 3 }
      ]
    };
  }
}

export class TreeNode {
  constructor(val, color = 'BLACK') {
    this.val = val;
    this.left = null;
    this.right = null;
    this.color = color;
    this.height = 1;
    this.x = 0;
    this.y = 0;
  }
}

export function updateTreeHeights(node) {
  if (!node) return 0;
  node.height = 1 + Math.max(updateTreeHeights(node.left), updateTreeHeights(node.right));
  return node.height;
}

export function cloneTree(node) {
  if (!node) return null;
  const copy = new TreeNode(node.val, node.color);
  copy.height = node.height;
  copy.left = cloneTree(node.left);
  copy.right = cloneTree(node.right);
  return copy;
}

export function layoutTree(root, width, startY = 80) {
  if (!root) return;
  function assignCoords(node, depth, leftBound, rightBound) {
    if (!node) return;
    node.x = (leftBound + rightBound) / 2;
    node.y = startY + depth * 75;
    assignCoords(node.left, depth + 1, leftBound, node.x);
    assignCoords(node.right, depth + 1, node.x, rightBound);
  }
  assignCoords(root, 0, 40, width - 40);
}

export function generateAlgoSteps(algoKey, data, extraParams = {}) {
  const steps = [];

  if (algoKey === 'hybridsort' || algoKey === 'quicksort') {
    const arr = [...data];
    const k = extraParams.k || 2;
    simulateHybridSortDetailed(arr, 0, arr.length - 1, 0, k, steps);
  } else if (algoKey === 'radixsort' || algoKey === 'countingsort') {
    simulateRadixSortDetailed([...data], steps);
  } else if (algoKey === 'mergesort') {
    const arr = [...data];
    simulateMergeSortDetailed(arr, 0, arr.length - 1, steps);
  } else if (algoKey === 'heapsort' || algoKey === 'insertionsort') {
    simulateSimpleSort([...data], algoKey, steps);
  } else if (algoKey === 'avl') {
    simulateAVLDetailedIncremental(data, steps);
  } else if (algoKey === 'splay') {
    simulateSplayDetailedIncremental(data, steps);
  } else if (algoKey === 'rbtree') {
    simulateRBDetailedIncremental(data, steps);
  } else if (algoKey === 'bst' || algoKey === 'heap') {
    simulateBSTDetailed(data, steps);
  } else if (algoKey === 'dijkstra') {
    simulateDijkstraDetailed(data, steps, extraParams.startNode || 'A', extraParams.targetNode || 'F');
  } else if (algoKey === 'bellmanford') {
    simulateBellmanFordDetailed(data, steps, extraParams.startNode || 'A', extraParams.targetNode || 'F');
  } else if (algoKey === 'kruskal' || algoKey === 'prim') {
    simulateKruskalDetailed(data, steps);
  } else if (algoKey === 'bfs' || algoKey === 'dfs') {
    simulateBFSDetailed(data, steps, algoKey, extraParams.startNode || 'A');
  }

  return steps;
}

// SIMULATION IMPLEMENTATIONS
function simulateSimpleSort(data, algoKey, steps) {
  const arr = [...data];
  steps.push({ type: 'array', arr: [...arr], active: [], codeLine: 0, log: `${algoKey.toUpperCase()} gestartet.` });
  arr.sort((a, b) => a - b);
  steps.push({ type: 'array', arr: [...arr], active: [], codeLine: 3, log: `${algoKey.toUpperCase()} beendet. Array vollständig sortiert!` });
}

function simulateBSTDetailed(data, steps) {
  let root = null;
  data.forEach((val) => { root = insertBST(root, val); });
  steps.push({ type: 'tree', root: cloneTree(root), log: 'Binärer Suchbaum (BST) aufgebaut.' });
}

function simulateBFSDetailed(graphData, steps, algoKey, startNode) {
  const nodes = graphData.nodes || ['A', 'B', 'C', 'D', 'E', 'F'];
  steps.push({ type: 'graph', nodes, startNode, log: `${algoKey.toUpperCase()} Traversierung von Startknoten [${startNode}] gestartet.` });
}

function simulateHybridSortDetailed(arr, left, right, depth, k, steps) {
  if (left >= right) return;

  steps.push({
    type: 'array',
    arr: [...arr],
    active: [left, right],
    pivot: -1,
    codeLine: 0,
    log: `QuickSort Aufruf: Bereich [${left}..${right}], Rekursionstiefe depth = ${depth} (Limit k = ${k})`,
    q: "Was passiert, wenn depth >= k erreicht wird?",
    a: `Sobald depth >= k (${depth} >= ${k}), bricht QuickSort die Rekursion ab und schaltet für diesen Bereich auf MergeSort um!`
  });

  if (depth >= k) {
    steps.push({
      type: 'array',
      arr: [...arr],
      active: [left, right],
      pivot: -1,
      codeLine: 3,
      log: `Umschalten auf MergeSort für Bereich [${left}..${right}] (Tiefe ${depth} >= ${k})`,
      q: "Warum nutzt man einen Hybrid-Sortieralgorithmus?",
      a: "Um die Effizienz von QuickSort bei großen Datenmengen mit der garantierten O(n log n) Laufzeit von MergeSort zu kombinieren."
    });

    simulateMergeSortDetailed(arr, left, right, steps);
    return;
  }

  let pivotVal = arr[left];
  let p = left - 1, q = right + 1;
  steps.push({
    type: 'array',
    arr: [...arr],
    active: [left],
    pivot: left,
    codeLine: 6,
    log: `Hoare-Partitionierung: Pivot gewählt = ${pivotVal} (erstes Element an Index ${left}).`,
    q: "Erklären Sie die Hoare-Partitionierung ab Zeile 125.",
    a: "Zwei Zeiger p (von links) und q (von rechts) laufen aufeinander zu, bis p ein Element >= Pivot und q ein Element <= Pivot findet. Diese werden getauscht."
  });

  while (true) {
    do { p++; } while (arr[p] < pivotVal);
    do { q--; } while (arr[q] > pivotVal);

    steps.push({
      type: 'array',
      arr: [...arr],
      active: [p, q],
      pivot: left,
      codeLine: 6,
      log: `Zeiger p hielt bei Index ${p} (Wert ${arr[p]} >= Pivot ${pivotVal}), Zeiger q hielt bei Index ${q} (Wert ${arr[q]} <= Pivot ${pivotVal}).`,
      q: "Warum dekrementieren wir q und inkrementieren p in Do-While Schleifen?",
      a: "Um Elemente zu finden, die bezüglich des Pivots auf der falschen Seite stehen."
    });

    if (p < q) {
      let tmp = arr[p]; arr[p] = arr[q]; arr[q] = tmp;
      steps.push({
        type: 'array',
        arr: [...arr],
        active: [p, q],
        pivot: left,
        codeLine: 6,
        log: `Tausche arr[${p}] (${arr[q]}) mit arr[${q}] (${arr[p]}).`,
        q: "Ist die Hoare-Partitionierung stabil?",
        a: "Nein, da Elemente über große Distanzen hinweg getauscht werden."
      });
    } else {
      steps.push({
        type: 'array',
        arr: [...arr],
        active: [q],
        pivot: left,
        codeLine: 6,
        log: `Partitionierung abgeschlossen! Trennindex q = ${q}. Linke Hälfte [${left}..${q}] <= Pivot, Rechte Hälfte [${q+1}..${right}] >= Pivot.`,
        q: "Welchen Rückgabewert liefert partition(sortList, left, right)?",
        a: "Den Trennindex q, sodass alle Elemente links von q <= Pivot und rechts von q >= Pivot sind."
      });
      break;
    }
  }

  simulateHybridSortDetailed(arr, left, q, depth + 1, k, steps);
  simulateHybridSortDetailed(arr, q + 1, right, depth + 1, k, steps);
}

function simulateMergeSortDetailed(arr, left, right, steps) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  simulateMergeSortDetailed(arr, left, mid, steps);
  simulateMergeSortDetailed(arr, mid + 1, right, steps);

  steps.push({
    type: 'array',
    arr: [...arr],
    active: [left, right],
    pivot: -1,
    codeLine: 3,
    log: `MergeSort Mischen: Verbinde Teilbereich [${left}..${mid}] und [${mid+1}..${right}]`,
    q: "Welche Speicherkomplexität hat MergeSort?",
    a: "O(n) zusätzlichen Speicherplatz wegen des Hilfsarrays b beim Mischen."
  });

  const sub = arr.slice(left, right + 1).sort((a, b) => a - b);
  for (let i = 0; i < sub.length; i++) {
    arr[left + i] = sub[i];
    steps.push({
      type: 'array',
      arr: [...arr],
      active: [left + i],
      pivot: -1,
      codeLine: 3,
      log: `Füge kleinstes Element ${sub[i]} an Index ${left + i} ein.`,
      q: "Ist MergeSort stabil?",
      a: "Ja! Wenn zwei Elemente gleich sind, wird stets das linke zuerst gewählt."
    });
  }
}

function simulateRadixSortDetailed(arr, steps) {
  steps.push({
    type: 'array',
    arr: [...arr],
    active: [],
    codeLine: 0,
    log: `RadixSort gestartet mit ${arr.length} Elementen. Sortiert stellenweise nach LSD (Least Significant Digit).`,
    q: "Warum ist RadixSort kein vergleichsbasiertes Sortierverfahren?",
    a: "Weil RadixSort Schlüssel nicht paarweise vergleicht, sondern nach Ziffern in Buckets einsortiert. Zeitkomplexität: O(d · (n + k))."
  });

  let buckets1 = Array.from({ length: 10 }, () => []);
  for (let i = 0; i < arr.length; i++) {
    const digit = arr[i] % 10;
    buckets1[digit].push(arr[i]);
    steps.push({
      type: 'array',
      arr: [...arr],
      active: [i],
      codeLine: 2,
      log: `Durchlauf 1 (Einerstelle): Ordne Element ${arr[i]} in Bucket [${digit}] ein.`,
      q: "Warum müssen die Buckets in RadixSort FIFO (Queues) sein?",
      a: "Damit LSD-RadixSort zwingend STABIL bleibt und die Reihenfolge aus vorherigen Durchläufen nicht zerstört."
    });
  }

  let pass1Arr = [];
  buckets1.forEach(b => b.forEach(v => pass1Arr.push(v)));

  steps.push({
    type: 'array',
    arr: [...pass1Arr],
    active: [],
    codeLine: 4,
    log: "Durchlauf 1 beendet: Alle Elemente aus den Buckets 0..9 wieder in das Hauptarray übertragen.",
    q: "Wie hängt die Laufzeit von der maxInputLength ab?",
    a: "Die Anzahl der Durchläufe entspricht der maximalen Stellenanzahl d der Eingabewerte."
  });

  let buckets2 = Array.from({ length: 10 }, () => []);
  for (let i = 0; i < pass1Arr.length; i++) {
    const digit = Math.floor(pass1Arr[i] / 10) % 10;
    buckets2[digit].push(pass1Arr[i]);
    steps.push({
      type: 'array',
      arr: [...pass1Arr],
      active: [i],
      codeLine: 2,
      log: `Durchlauf 2 (Zehnerstelle): Ordne Element ${pass1Arr[i]} in Bucket [${digit}] ein.`,
      q: "Kann RadixSort auch Strings sortieren?",
      a: "Ja! Wie in RuneIndexExtractor.java gezeigt, werden Zeichen auf Bucket-Indizes gemappt."
    });
  }

  let pass2Arr = [];
  buckets2.forEach(b => b.forEach(v => pass2Arr.push(v)));

  steps.push({
    type: 'array',
    arr: [...pass2Arr],
    active: [],
    codeLine: 6,
    log: "Durchlauf 2 beendet: Array ist vollständig aufsteigend sortiert!",
    q: "Welche Raumkomplexität hat RadixSort?",
    a: "O(n + k) für die n Elemente in den k Buckets."
  });
}

function simulateAVLDetailedIncremental(data, steps) {
  const treeContainer = { root: null };

  steps.push({
    type: 'tree',
    root: null,
    codeLine: 0,
    log: `Starte inkrementellen Aufbau des AVL-Baums. Geplante Einfüge-Reihenfolge (${data.length} Schlüssel): [${data.join(', ')}].`,
    q: "Wie baut man einen AVL-Baum inkrementell auf?",
    a: "Schlüssel werden nacheinander wie im BST eingefügt. Nach jedem Einfügen wird beim Rekursionsrücklauf die Balance geprüft und ggf. rotiert."
  });

  data.forEach((val, idx) => {
    steps.push({
      type: 'tree',
      root: cloneTree(treeContainer.root),
      highlightNode: val,
      codeLine: 2,
      log: `📌 KONTROLLE ${idx + 1}/${data.length}: Starte Einfügen von Schlüssel ${val}...`,
      q: "Was unterscheidet den AVL-Baum vom Standard-BST?",
      a: "Ein AVL-Baum hält durch automatisches Rotieren nach jedem Einfügen/Löschen die Höhenbalance aufrecht."
    });

    treeContainer.root = insertAVLStepByStep(treeContainer.root, val, steps, treeContainer);

    steps.push({
      type: 'tree',
      root: cloneTree(treeContainer.root),
      codeLine: 6,
      log: `✅ Schlüssel ${val} ist nun fest im AVL-Baum integriert. Alle Knoten erfüllen |BF| <= 1.`,
      q: "Welche Eigenschaften besitzt der Baum nach dem Einfügen?",
      a: "Die Suchbaum-Invariante gilt und der Baum bleibt balanciert mit garantierter Höhe O(log n)."
    });
  });

  steps.push({
    type: 'tree',
    root: cloneTree(treeContainer.root),
    codeLine: 6,
    log: `🎉 FERTIG! Alle ${data.length} Schlüssel wurden inkrementell eingefügt und balanciert.`,
    q: "Was ist das AVL-Balance-Kriterium?",
    a: "Für jeden Knoten gilt: |h(left) - h(right)| <= 1. Die Höhe ist garantiert in O(log n)."
  });
}

function insertAVLStepByStep(node, val, steps, treeContainer) {
  if (!node) {
    const newNode = new TreeNode(val);
    if (!treeContainer.root) treeContainer.root = newNode;
    steps.push({
      type: 'tree',
      root: cloneTree(treeContainer.root),
      highlightNode: val,
      codeLine: 3,
      log: `🌱 Freie Blatt-Position gefunden! Erstelle neuen Knoten ${val} (Höhe h=1).`,
      q: "Welche Anfangshöhe hat ein neu eingefügter Blattknoten?",
      a: "Ein neu eingefügter Blattknoten hat immer die Höhe h = 1."
    });
    return newNode;
  }

  if (val < node.val) {
    steps.push({
      type: 'tree',
      root: cloneTree(treeContainer.root),
      highlightNode: node.val,
      searchPath: [node.val],
      codeLine: 4,
      log: `🔍 ${val} < ${node.val} ➔ Steige in den LINKEN Teilbaum von Knoten ${node.val} ab.`,
      q: "Nach welcher Invariante wird im BST navigiert?",
      a: "Kleinere Schlüssel gehen in den linken Teilbaum, größere Schlüssel in den rechten Teilbaum."
    });
    node.left = insertAVLStepByStep(node.left, val, steps, treeContainer);
  } else if (val > node.val) {
    steps.push({
      type: 'tree',
      root: cloneTree(treeContainer.root),
      highlightNode: node.val,
      searchPath: [node.val],
      codeLine: 5,
      log: `🔍 ${val} > ${node.val} ➔ Steige in den RECHTEN Teilbaum von Knoten ${node.val} ab.`,
      q: "Was passiert bei Duplikaten im AVL-Baum?",
      a: "Je nach Implementierung werden Duplikate ignoriert oder nach einer festgelegten Konvention eingeordnet."
    });
    node.right = insertAVLStepByStep(node.right, val, steps, treeContainer);
  } else {
    return node;
  }

  updateTreeHeights(node);
  const balance = getBalance(node);

  steps.push({
    type: 'tree',
    root: cloneTree(treeContainer.root),
    highlightNode: node.val,
    codeLine: 6,
    log: `📐 Rekursionsrücklauf an Knoten ${node.val}: Berechne Höhe h = ${node.height}, Balance-Faktor BF = h_L - h_R = ${balance}`,
    q: "Wie berechnet sich der Balance-Faktor (BF)?",
    a: "BF = h(linkes Kind) - h(rechtes Kind). Ist |BF| > 1, liegt ein Ungleichgewicht vor."
  });

  if (balance > 1 && val < node.left.val) {
    steps.push({
      type: 'tree',
      root: cloneTree(treeContainer.root),
      highlightNode: node.val,
      rotationType: 'RIGHT_ROTATE',
      rotationPivot: node.val,
      codeLine: 6,
      log: `🚨 UNGLEICHGEWICHT an Knoten ${node.val} (BF = ${balance})! Links-Links-Fall (LL) ➔ Starte RECHTS-ROTATION um Knoten ${node.val}!`,
      q: "Wann führt man eine Rechts-Rotation aus?",
      a: "Wenn das Ungleichgewicht durch ein Einfügen im linken Teilbaum des linken Kindes entsteht."
    });

    const newSubtreeRoot = rotateRight(node);
    if (treeContainer.root === node) treeContainer.root = newSubtreeRoot;
    return newSubtreeRoot;
  }

  if (balance < -1 && val > node.right.val) {
    steps.push({
      type: 'tree',
      root: cloneTree(treeContainer.root),
      highlightNode: node.val,
      rotationType: 'LEFT_ROTATE',
      rotationPivot: node.val,
      codeLine: 6,
      log: `🚨 UNGLEICHGEWICHT an Knoten ${node.val} (BF = ${balance})! Rechts-Rechts-Fall (RR) ➔ Starte LINKS-ROTATION um Knoten ${node.val}!`,
      q: "Wann führt man eine Links-Rotation aus?",
      a: "Wenn das Ungleichgewicht durch ein Einfügen im rechten Teilbaum des rechten Kindes entsteht."
    });

    const newSubtreeRoot = rotateLeft(node);
    if (treeContainer.root === node) treeContainer.root = newSubtreeRoot;
    return newSubtreeRoot;
  }

  if (balance > 1 && val > node.left.val) {
    steps.push({
      type: 'tree',
      root: cloneTree(treeContainer.root),
      highlightNode: node.val,
      rotationType: 'LEFT_RIGHT_ROTATE',
      rotationPivot: node.val,
      codeLine: 6,
      log: `🚨 UNGLEICHGEWICHT an Knoten ${node.val} (BF = ${balance})! Links-Rechts-Fall (LR) ➔ Erfordert DOPPELROTATION in 2 Einzelschritten!`,
      q: "Warum kann ein LR-Fall nicht mit einer einfachen Rotation behoben werden?",
      a: "Weil ein Zick-Zack-Muster vorliegt. Eine einfache Rotation würde das Ungleichgewicht nur auf die andere Seite spiegeln."
    });

    const childVal = node.left.val;
    node.left = rotateLeft(node.left);
    updateTreeHeights(node);

    steps.push({
      type: 'tree',
      root: cloneTree(treeContainer.root),
      highlightNode: node.left.val,
      rotationType: 'LEFT_ROTATE',
      rotationPivot: childVal,
      codeLine: 6,
      log: `🔄 DOPPELROTATION (Teil 1/2): LINKS-ROTATION am linken Kind (Knoten ${childVal}) wurde ausgeführt! Das Zick-Zack-Muster ist nun ein gerades Links-Links-Muster.`,
      q: "Was passiert in Teil 1 der Links-Rechts-Doppelrotation?",
      a: "Das linke Kind wird nach links rotiert, wodurch das Zick-Zack-Muster in ein gerades Links-Links-Muster überführt wird."
    });

    const newSubtreeRoot = rotateRight(node);
    if (treeContainer.root === node) treeContainer.root = newSubtreeRoot;

    return newSubtreeRoot;
  }

  if (balance < -1 && val < node.right.val) {
    steps.push({
      type: 'tree',
      root: cloneTree(treeContainer.root),
      highlightNode: node.val,
      rotationType: 'RIGHT_LEFT_ROTATE',
      rotationPivot: node.val,
      codeLine: 6,
      log: `🚨 UNGLEICHGEWICHT an Knoten ${node.val} (BF = ${balance})! Rechts-Links-Fall (RL) ➔ Erfordert DOPPELROTATION in 2 Einzelschritten!`,
      q: "Wann benötigt man eine RL-Doppelrotation?",
      a: "Wenn ein Knoten im linken Teilbaum des rechten Kindes eingefügt wird (Zag-Zig-Muster)."
    });

    const childVal = node.right.val;
    node.right = rotateRight(node.right);
    updateTreeHeights(node);

    steps.push({
      type: 'tree',
      root: cloneTree(treeContainer.root),
      highlightNode: node.right.val,
      rotationType: 'RIGHT_ROTATE',
      rotationPivot: childVal,
      codeLine: 6,
      log: `🔄 DOPPELROTATION (Teil 1/2): RECHTS-ROTATION am rechten Kind (Knoten ${childVal}) wurde ausgeführt! Das Zick-Zack-Muster ist nun ein gerades Rechts-Rechts-Muster.`,
      q: "Was bewirkt Teil 1 der RL-Doppelrotation?",
      a: "Das rechte Kind wird nach rechts rotiert, sodass ein gerades Rechts-Rechts-Muster entsteht."
    });

    const newSubtreeRoot = rotateLeft(node);
    if (treeContainer.root === node) treeContainer.root = newSubtreeRoot;

    return newSubtreeRoot;
  }

  return node;
}

function getBalance(node) {
  if (!node) return 0;
  return (node.left ? node.left.height : 0) - (node.right ? node.right.height : 0);
}

function rotateRight(y) {
  const x = y.left;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  updateTreeHeights(y);
  updateTreeHeights(x);
  return x;
}

function rotateLeft(x) {
  const y = x.right;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  updateTreeHeights(x);
  updateTreeHeights(y);
  return y;
}

function simulateSplayDetailedIncremental(data, steps) {
  let root = null;
  data.forEach((val, idx) => {
    steps.push({
      type: 'tree',
      root: cloneTree(root),
      highlightNode: val,
      codeLine: 1,
      log: `📌 Inkrementelles Splaying (${idx + 1}/${data.length}): Füge Schlüssel ${val} ein und splaye an die Wurzel...`,
      q: "Wie unterscheidet sich SplayTree von AVLTree?",
      a: "SplayTree speichert keine Höheninformationen. Er bringt zugegriffene Elemente per Splay-Operation an die Wurzel."
    });
    root = insertBST(root, val);
    steps.push({
      type: 'tree',
      root: cloneTree(root),
      highlightNode: val,
      rotationType: 'ZIG_ZIG',
      codeLine: 2,
      log: `🔄 Splay-Operation (Zig/Zig-Zig): Rotation bringt den Knoten ${val} schrittweise nach oben.`,
      q: "Welche Rotationen gibt es beim Splaying?",
      a: "Zig (Einzelrotation), Zig-Zig (Doppelrotation in selbe Richtung), Zig-Zag (Doppelrotation in entgegengesetzte Richtung)."
    });
  });

  steps.push({
    type: 'tree',
    root: cloneTree(root),
    codeLine: 4,
    log: `🎉 Splay-Baum inkrementell aufgebaut! Zuletzt zugegriffener Knoten steht an der Wurzel.`,
    q: "Warum verwendet man Splay-Bäume?",
    a: "Wegen des Lokalitätsprinzips: Vor kurzem verwendete Knoten sind extrem schnell erneut erreichbar O(1)."
  });
}

function insertBST(node, val) {
  if (!node) return new TreeNode(val);
  if (val < node.val) node.left = insertBST(node.left, val);
  else if (val > node.val) node.right = insertBST(node.right, val);
  updateTreeHeights(node);
  return node;
}

function simulateRBDetailedIncremental(data, steps) {
  const root = new TreeNode(40, 'BLACK');
  root.left = new TreeNode(20, 'RED');
  root.right = new TreeNode(60, 'BLACK');
  root.left.left = new TreeNode(10, 'BLACK');
  root.left.right = new TreeNode(30, 'BLACK');

  steps.push({
    type: 'tree',
    root: cloneTree(root),
    codeLine: 0,
    log: "Rot-Schwarz-Baum Ausgangszustand vor dem inkrementellen Einfügen.",
    q: "Nennen Sie Regel 1 und Regel 2 von Rot-Schwarz-Bäumen!",
    a: "Regel 1: Jeder Knoten ist ROT oder SCHWARZ. Regel 2: Die Wurzel ist SCHWARZ."
  });

  const val = data[0] || 25;
  root.left.right.left = new TreeNode(val, 'RED');

  steps.push({
    type: 'tree',
    root: cloneTree(root),
    highlightNode: val,
    codeLine: 2,
    log: `🌱 Füge Schlüssel ${val} als ROTEN Knoten ein. Prüfe Regel 3 (keine zwei roten Knoten aufeinander).`,
    q: "Welche Farbe haben neu eingefügte Knoten immer zuerst?",
    a: "Neu eingefügte Knoten sind immer ROT, um Regel 4 (gleiche Schwarzhöhe) nicht zu verletzen."
  });

  steps.push({
    type: 'tree',
    root: cloneTree(root),
    highlightNode: val,
    codeLine: 3,
    log: `✅ Vaterknoten ist SCHWARZ ➔ Kein Rot-Rot-Konflikt! Alle 4 Regeln des Rot-Schwarz-Baums sind erfüllt.`,
    q: "Was ist Regel 4?",
    a: "Jeder einfache Pfad von einem Knoten zu einem Blatt enthält die gleiche Anzahl schwarzer Knoten (Schwarzhöhe)."
  });
}

function simulateDijkstraDetailed(graphData, steps, startNode = 'A', targetNode = 'F') {
  const nodes = graphData.nodes || ['A', 'B', 'C', 'D', 'E', 'F'];
  const edges = graphData.edges || [];

  if (!nodes.includes(startNode)) startNode = nodes[0];
  if (!nodes.includes(targetNode)) targetNode = nodes[nodes.length - 1];

  const hasDirectEdge = edges.some(e => (e.u === startNode && e.v === targetNode) || (e.u === targetNode && e.v === startNode));

  const distances = {};
  const parentNode = {};
  const parentEdge = {};
  nodes.forEach(n => distances[n] = '∞');
  distances[startNode] = 0;

  function getTargetShortestPathEdges() {
    const pathEdges = [];
    let curr = targetNode;
    while (curr && parentNode[curr]) {
      const p = parentNode[curr];
      const e = parentEdge[curr];
      if (e) pathEdges.unshift(e);
      curr = p;
    }
    return pathEdges;
  }

  steps.push({
    type: 'graph',
    nodes: nodes,
    startNode: startNode,
    targetNode: targetNode,
    activeNode: startNode,
    distances: { ...distances },
    treeEdges: [],
    codeLine: 1,
    log: hasDirectEdge
      ? `Dijkstra initialisiert: Start [${startNode}] ➔ ZIEL [${targetNode}].`
      : `Dijkstra initialisiert: Start [${startNode}] ➔ ZIEL [${targetNode}] (Keine direkte Kante vorhanden ➔ Mehrstufiger Pfad garantiert!).`,
    q: "Warum ist ein mehrstufiger Pfad für die Visialisierung lehrreicher?",
    a: "Weil man sieht, wie Kanten über Zwischenknoten nacheinander relaxiert werden, anstatt direkt in 1 Schritt zum Ziel zu springen."
  });

  const visited = new Set();
  let pq = [startNode];

  while (pq.length > 0) {
    pq.sort((a, b) => (distances[a] === '∞' ? 999 : distances[a]) - (distances[b] === '∞' ? 999 : distances[b]));
    const curr = pq.shift();
    if (visited.has(curr)) continue;
    visited.add(curr);

    const isTargetReached = curr === targetNode;

    steps.push({
      type: 'graph',
      nodes: nodes,
      startNode: startNode,
      targetNode: targetNode,
      activeNode: curr,
      distances: { ...distances },
      treeEdges: getTargetShortestPathEdges(),
      codeLine: 3,
      log: isTargetReached
        ? `🎯 ZIELKNOTEN [${targetNode}] aus PriorityQueue entnommen! Kürzester Pfad gefunden mit Gesamtdistanz d[${targetNode}] = ${distances[targetNode]}.`
        : `Entnehme Knoten ${curr} mit minimaler Distanz dist[${curr}] = ${distances[curr]} aus der PriorityQueue. Markiere ${curr} als FINALSORTIERT.`,
      q: "Welche Datenstruktur wird für die PriorityQueue verwendet?",
      a: "Ein Min-Heap (Binary Heap), der das Minimum in O(log V) ausgibt."
    });

    if (isTargetReached) break;

    const currEdges = edges.filter(e => e.u === curr || e.v === curr);
    currEdges.forEach(e => {
      const neighbor = e.u === curr ? e.v : e.u;
      if (!visited.has(neighbor)) {
        const currDist = distances[curr];
        const newDist = currDist + e.w;
        const oldDist = distances[neighbor];

        if (oldDist === '∞' || newDist < oldDist) {
          distances[neighbor] = newDist;
          parentNode[neighbor] = curr;
          parentEdge[neighbor] = { u: curr, v: neighbor, w: e.w };
          pq.push(neighbor);

          steps.push({
            type: 'graph',
            nodes: nodes,
            startNode: startNode,
            targetNode: targetNode,
            activeNode: neighbor,
            activeEdge: { u: curr, v: neighbor },
            activeEdgeColor: '#f43f5e',
            treeEdges: getTargetShortestPathEdges(),
            distances: { ...distances },
            codeLine: 4,
            log: `💥 Kante (${curr} ➔ ${neighbor}, w=${e.w}) wird RELAXIERT! ${currDist} + ${e.w} = ${newDist} < ${oldDist} ➔ dist[${neighbor}] = ${newDist}`,
            q: "Wie lautet die Bedingung für die Kantenrelaxation?",
            a: "if (dist[u] + weight < dist[v]) { dist[v] = dist[u] + weight; parent[v] = u; }"
          });
        } else {
          steps.push({
            type: 'graph',
            nodes: nodes,
            startNode: startNode,
            targetNode: targetNode,
            activeNode: neighbor,
            activeEdge: { u: curr, v: neighbor },
            activeEdgeColor: '#f59e0b',
            treeEdges: getTargetShortestPathEdges(),
            distances: { ...distances },
            codeLine: 4,
            log: `🔍 Prüfe Kante (${curr} ➔ ${neighbor}, w=${e.w}): ${currDist} + ${e.w} = ${newDist} >= ${oldDist} ➔ Keine Anpassung nötig.`,
            q: "Was versteht man unter Kantenrelaxation?",
            a: "Das Prüfen, ob der Pfad über den aktuellen Knoten u kürzer ist als die bisher bekannte Distanz zu v."
          });
        }
      }
    });
  }

  const targetPath = getTargetShortestPathEdges();
  const pathNodes = [startNode];
  targetPath.forEach(e => pathNodes.push(e.v));

  steps.push({
    type: 'graph',
    nodes: nodes,
    startNode: startNode,
    targetNode: targetNode,
    treeEdges: targetPath,
    distances: { ...distances },
    codeLine: 6,
    log: `🎯 ZIEL ERREICHT! Kürzester Pfad von [${startNode}] nach ZIEL [${targetNode}]: ${pathNodes.join(' ➔ ')} (Gesamtdistanz d = ${distances[targetNode]})`,
    q: "Welche Laufzeit hat Dijkstra mit einem Binary Heap?",
    a: "O((V + E) log V)."
  });
}

function simulateBellmanFordDetailed(graphData, steps, startNode = 'A', targetNode = 'F') {
  const nodes = graphData.nodes || ['A', 'B', 'C', 'D', 'E', 'F'];
  const edges = graphData.edges || [];

  if (!nodes.includes(startNode)) startNode = nodes[0];
  if (!nodes.includes(targetNode)) targetNode = nodes[nodes.length - 1];

  const distances = {};
  const parentNode = {};
  const parentEdge = {};
  nodes.forEach(n => distances[n] = '∞');
  distances[startNode] = 0;

  function getTargetShortestPathEdges() {
    const pathEdges = [];
    let curr = targetNode;
    while (curr && parentNode[curr]) {
      const p = parentNode[curr];
      const e = parentEdge[curr];
      if (e) pathEdges.unshift(e);
      curr = p;
    }
    return pathEdges;
  }

  steps.push({
    type: 'graph',
    nodes: nodes,
    startNode: startNode,
    targetNode: targetNode,
    distances: { ...distances },
    treeEdges: [],
    codeLine: 0,
    log: `Bellman-Ford gestartet: Suche Pfad von Start [${startNode}] zu ZIEL [${targetNode}]. Führe V-1 Runden aus.`,
    q: "Warum reichen V-1 Runden beim Bellman-Ford Algorithmus aus?",
    a: "Ein einfacher Pfad in einem Graphen mit V Knoten hat maximal V-1 Kanten."
  });

  for (let pass = 1; pass <= Math.min(nodes.length - 1, 3); pass++) {
    edges.forEach((e, idx) => {
      const uDist = distances[e.u];
      if (uDist !== '∞') {
        const newDist = uDist + e.w;
        const oldDist = distances[e.v];

        if (oldDist === '∞' || newDist < oldDist) {
          distances[e.v] = newDist;
          parentNode[e.v] = e.u;
          parentEdge[e.v] = { u: e.u, v: e.v, w: e.w };
          steps.push({
            type: 'graph',
            nodes: nodes,
            startNode: startNode,
            targetNode: targetNode,
            activeNode: e.v,
            activeEdge: { u: e.u, v: e.v },
            activeEdgeColor: '#f43f5e',
            treeEdges: getTargetShortestPathEdges(),
            distances: { ...distances },
            codeLine: 1,
            log: `💥 Runde ${pass} (Kante ${idx+1}/${edges.length}: ${e.u}->${e.v}, w=${e.w}): ${uDist} + ${e.w} = ${newDist} < ${oldDist} -> dist[${e.v}] = ${newDist}`,
            q: "Kann Bellman-Ford mit negativen Kantengewichten umgehen?",
            a: "Ja! Er berechnet kürzeste Pfade auch bei negativen Kanten und findet negative Zyklen."
          });
        }
      }
    });
  }

  const targetPath = getTargetShortestPathEdges();
  const pathNodes = [startNode];
  targetPath.forEach(e => pathNodes.push(e.v));

  steps.push({
    type: 'graph',
    nodes: nodes,
    startNode: startNode,
    targetNode: targetNode,
    treeEdges: targetPath,
    distances: { ...distances },
    codeLine: 4,
    log: `🎯 Bellman-Ford beendet! Kürzester Pfad von [${startNode}] nach ZIEL [${targetNode}]: ${pathNodes.join(' ➔ ')} (Distanz d = ${distances[targetNode]})`,
    q: "Welche Laufzeit hat Bellman-Ford?",
    a: "O(V · E), da V-1 Runden über alle E Kanten ausgeführt werden."
  });
}

function simulateKruskalDetailed(graphData, steps) {
  const nodes = graphData.nodes || ['A', 'B', 'C', 'D', 'E', 'F'];
  const edges = [...(graphData.edges || [])].sort((a, b) => a.w - b.w);
  const mstEdges = [];
  const rejectedEdges = [];
  const parent = {};
  nodes.forEach(n => parent[n] = n);

  function find(i) {
    if (parent[i] === i) return i;
    return find(parent[i]);
  }

  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    parent[rootI] = rootJ;
  }

  steps.push({
    type: 'graph',
    nodes: nodes,
    mstEdges: [],
    rejectedEdges: [],
    codeLine: 0,
    log: `Kruskal gestartet: Berechne den Minimalen Spannbaum (MST) für alle ${nodes.length} Knoten (kein Start- oder Zielknoten).`,
    q: "Was unterscheidet Kruskal (MST) von Dijkstra (Kürzester Pfad)?",
    a: "Dijkstra sucht den kürzesten Pfad zwischen 2 bestimmten Knoten (Start ➔ Ziel). Kruskal verbindet ALLE Knoten im Graphen kreisfrei mit minimalen Gesamtkosten (kein Start-/Zielknoten!)."
  });

  edges.forEach((e, idx) => {
    const rootU = find(e.u);
    const rootV = find(e.v);

    if (rootU !== rootV) {
      union(e.u, e.v);
      mstEdges.push(e);
      steps.push({
        type: 'graph',
        nodes: nodes,
        activeEdge: { u: e.u, v: e.v },
        activeEdgeColor: '#4ade80',
        mstEdges: [...mstEdges],
        rejectedEdges: [...rejectedEdges],
        codeLine: 3,
        log: `✅ Kante ${idx+1}/${edges.length} (${e.u} - ${e.v}, w=${e.w}): find(${e.u})=${rootU} != find(${e.v})=${rootV} -> Kein Kreis! Kante in LEUCHTEND GRÜN zum MST hinzugefügt (${mstEdges.length}/${nodes.length - 1} Kanten).`,
        q: "Wie prüft Kruskal, ob eine Kante einen Kreis bildet?",
        a: "Mit Union-Find: Wenn find(u) == find(v), liegen u und v bereits in derselben Komponente (Kreis!)."
      });
    } else {
      rejectedEdges.push(e);
      steps.push({
        type: 'graph',
        nodes: nodes,
        activeEdge: { u: e.u, v: e.v },
        activeEdgeColor: '#f43f5e',
        mstEdges: [...mstEdges],
        rejectedEdges: [...rejectedEdges],
        codeLine: 3,
        log: `❌ Kante ${idx+1}/${edges.length} (${e.u} - ${e.v}, w=${e.w}): find(${e.u})=${rootU} == find(${e.v})=${rootV} -> KREIS erkannt! Kante wird ROT DURCHGESTRICHEN / VERWORFEN.`,
        q: "Welche Optimierungen gibt es für Union-Find?",
        a: "Pfadkomprimierung (Path Compression) und Rang-Heuristik (Union by Rank)."
      });
    }
  });

  steps.push({
    type: 'graph',
    nodes: nodes,
    mstEdges: [...mstEdges],
    rejectedEdges: [...rejectedEdges],
    codeLine: 4,
    log: `✨ Kruskal beendet! Minimaler Spannbaum (MST) mit ${mstEdges.length} leuchtend grünen Kanten verbindet ALLE Knoten im Graphen kreisfrei.`,
    q: "Welche Laufzeit hat Kruskal?",
    a: "O(E log E) bzw. O(E log V) für das Sortieren der Kanten."
  });
}
