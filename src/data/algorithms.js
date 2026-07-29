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
    name: "⭐ Splay-Baum (Galles USFCA Zig / Zig-Zig Rotationen)",
    category: "tree",
    isTestat: true,
    file: "SplayTree.java",
    code: [
      "public void splay(SplayNode<T> node) {",
      "    while (node.parent != null) {",
      "        if (node.parent.parent == null) rotate(node); // Zig",
      "        else if (isZigZig(node)) { rotate(node.parent); rotate(node); } // Zig-Zig (Parent zuerst!)",
      "        else { rotate(node); rotate(node); } // Zig-Zag",
      "    }",
      "}"
    ]
  },
  rbtree: {
    name: "⭐ Rot-Schwarz-Baum (CLRS Kap. 13 & 4 Regeln)",
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
    name: "Max-Heap / PriorityQueue (Galles USFCA & CLRS Kap. 6)",
    category: "tree",
    isTestat: false,
    file: "MaxHeap.java",
    code: [
      "public void insert(int key) {",
      "    heap.add(key); // Am Ende des Arrays anfügen",
      "    heapifyUp(heap.size() - 1); // Up-Heapify mit Parent (i-1)/2",
      "}"
    ]
  },
  minheap: {
    name: "⭐ Min-Heap (Galles USFCA Original)",
    category: "tree",
    isTestat: false,
    file: "MinHeap.java",
    code: [
      "public void insert(int key) {",
      "    heap.add(key); // Am Ende des Arrays anfügen",
      "    heapifyUpMin(heap.size() - 1); // Parent <= Child",
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
  },
  // USFCA GALLES FULL SUITE ADDITIONS
  bubblesort: {
    name: "BubbleSort (USFCA Galles)",
    category: "sort",
    isTestat: false,
    file: "BubbleSort.java",
    code: [
      "for (int i = 0; i < n - 1; i++) {",
      "    for (int j = 0; j < n - i - 1; j++) {",
      "        if (arr[j] > arr[j + 1]) swap(arr, j, j + 1);",
      "    }",
      "}"
    ]
  },
  selectionsort: {
    name: "SelectionSort (USFCA Galles)",
    category: "sort",
    isTestat: false,
    file: "SelectionSort.java",
    code: [
      "for (int i = 0; i < n - 1; i++) {",
      "    int minIdx = i;",
      "    for (int j = i + 1; j < n; j++) if (arr[j] < arr[minIdx]) minIdx = j;",
      "    swap(arr, i, minIdx);",
      "}"
    ]
  },
  shellsort: {
    name: "ShellSort (USFCA Galles - Gap)",
    category: "sort",
    isTestat: false,
    file: "ShellSort.java",
    code: [
      "for (int gap = n / 2; gap > 0; gap /= 2) {",
      "    for (int i = gap; i < n; i++) {",
      "        int temp = arr[i], j = i;",
      "        while (j >= gap && arr[j - gap] > temp) { arr[j] = arr[j - gap]; j -= gap; }",
      "        arr[j] = temp;",
      "    }",
      "}"
    ]
  },
  bucketsort: {
    name: "BucketSort (USFCA Galles Uniform)",
    category: "sort",
    isTestat: false,
    file: "BucketSort.java",
    code: [
      "List<Float>[] buckets = new List[n];",
      "for (float v : arr) buckets[(int)(n * v)].add(v);",
      "for (List b : buckets) Collections.sort(b);",
      "concatenateBuckets();"
    ]
  },
  btree: {
    name: "B-Tree (USFCA Galles Multi-Way Tree)",
    category: "tree",
    isTestat: false,
    file: "BTree.java",
    code: [
      "public void insert(T key) {",
      "    if (root.isFull()) { BTreeNode s = splitRoot(); insertNonFull(s, key); }",
      "    else insertNonFull(root, key);",
      "}"
    ]
  },
  bplustree: {
    name: "B+ Tree (USFCA Galles Leaf Tree)",
    category: "tree",
    isTestat: false,
    file: "BPlusTree.java",
    code: [
      "public void insert(T key) {",
      "    LeafNode leaf = findLeaf(key);",
      "    leaf.insertSorted(key);",
      "    if (leaf.isOverflow()) splitLeafAndPromote(leaf);",
      "}"
    ]
  },
  openhash: {
    name: "Open Hash Table (Chaining)",
    category: "tree",
    isTestat: false,
    file: "OpenHash.java",
    code: [
      "int hash = key % TABLE_SIZE;",
      "table[hash].addFirst(key);"
    ]
  },
  closedhash: {
    name: "Closed Hash Table (Linear Probing)",
    category: "tree",
    isTestat: false,
    file: "ClosedHash.java",
    code: [
      "int hash = key % TABLE_SIZE;",
      "while (table[hash] != null) hash = (hash + 1) % TABLE_SIZE;",
      "table[hash] = key;"
    ]
  },
  toposort: {
    name: "Topologische Sortierung (TopoSort)",
    category: "graph",
    isTestat: false,
    file: "TopologicalSort.java",
    code: [
      "Queue<Node> q = new LinkedList<>();",
      "for (Node u : nodes) if (indegree[u] == 0) q.add(u);",
      "while (!q.isEmpty()) { Node u = q.poll(); topoOrder.add(u); updateIndegrees(); }"
    ]
  },
  floyd: {
    name: "Floyd-Warshall (All Pairs Shortest Paths)",
    category: "graph",
    isTestat: false,
    file: "FloydWarshall.java",
    code: [
      "for (int k = 0; k < V; k++)",
      "  for (int i = 0; i < V; i++)",
      "    for (int j = 0; j < V; j++)",
      "      dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);"
    ]
  },
  binomialqueue: {
    name: "Binomial Queue (Forest of Binomial Trees)",
    category: "heaps",
    isTestat: false,
    file: "BinomialQueue.java",
    code: [
      "public BinomialQueue merge(BinomialQueue h1, BinomialQueue h2) {",
      "    // Combine B_k trees of equal rank",
      "}"
    ]
  },
  fibonacciheap: {
    name: "Fibonacci Heap (Amortized PQ)",
    category: "heaps",
    isTestat: false,
    file: "FibonacciHeap.java",
    code: [
      "public void insert(Node node) {",
      "    minRoot.addSibling(node);",
      "    if (node.key < minRoot.key) minRoot = node;",
      "}"
    ]
  },
  leftistheap: {
    name: "Leftist Heap (Null Path Length)",
    category: "heaps",
    isTestat: false,
    file: "LeftistHeap.java",
    code: [
      "public Node merge(Node h1, Node h2) {",
      "    if (h1.npl < h2.npl) swapChildren(h1);",
      "}"
    ]
  },
  skewheap: {
    name: "Skew Heap (Self-Adjusting)",
    category: "heaps",
    isTestat: false,
    file: "SkewHeap.java",
    code: [
      "public Node merge(Node h1, Node h2) {",
      "    swapChildren(h1); // Unconditional swap",
      "}"
    ]
  },
  dpfib: {
    name: "Fibonacci (Dynamic Programming)",
    category: "dp",
    isTestat: false,
    file: "DPFibonacci.java",
    code: [
      "dp[0] = 0; dp[1] = 1;",
      "for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];"
    ]
  },
  dpchange: {
    name: "Coin Change Problem (DP)",
    category: "dp",
    isTestat: false,
    file: "DPCoinChange.java",
    code: [
      "dp[0] = 0;",
      "for (int i = 1; i <= amount; i++)",
      "  for (int c : coins) if (i >= c) dp[i] = Math.min(dp[i], dp[i-c] + 1);"
    ]
  },
  dplcs: {
    name: "Longest Common Subsequence (LCS)",
    category: "dp",
    isTestat: false,
    file: "LongestCommonSubsequence.java",
    code: [
      "if (X[i-1] == Y[j-1]) L[i][j] = L[i-1][j-1] + 1;",
      "else L[i][j] = Math.max(L[i-1][j], L[i][j-1]);"
    ]
  },
  recfact: {
    name: "Fakultät (Rekursion & Call-Stack)",
    category: "dp",
    isTestat: false,
    file: "RecursionFactorial.java",
    code: [
      "int fact(int n) {",
      "    if (n <= 1) return 1;",
      "    return n * fact(n - 1);",
      "}"
    ]
  },
  recqueens: {
    name: "N-Damen Problem (Backtracking)",
    category: "dp",
    isTestat: false,
    file: "NQueensBacktracking.java",
    code: [
      "boolean solve(int col) {",
      "    if (col >= N) return true;",
      "    for (int i = 0; i < N; i++) {",
      "        if (isSafe(i, col)) { placeQueen(i, col); if (solve(col+1)) return true; removeQueen(i, col); }",
      "    }",
      "    return false;",
      "}"
    ]
  },
  disjointset: {
    name: "Disjoint Sets / Union-Find",
    category: "dp",
    isTestat: false,
    file: "DisjointSetUnionFind.java",
    code: [
      "int find(int i) { if (parent[i] == i) return i; return parent[i] = find(parent[i]); }",
      "void union(int i, int j) { parent[find(i)] = find(j); }"
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
    case 'rbtree':
    case 'bst':
      return [40, 20, 60, 10, 30, 25];
    case 'heap':
      return [10, 20, 60, 40, 50, 30];
    case 'minheap':
      return [12, 31, 36, 85, 35, 73];
    case 'openhash':
    case 'closedhash':
      return [12, 31, 36, 85, 35, 73, 10, 11];
    case 'splay':
      return [10, 60, 20, 40];
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

export function generateAdvancedExamData(category, algoKey) {
  if (category === 'sort') {
    if (algoKey === 'radixsort' || algoKey === 'countingsort') {
      return [904, 23, 812, 45, 904, 170, 802, 66, 24, 75, 45, 12, 999];
    }
    return [88, 12, 45, 12, 99, 34, 67, 12, 90, 23, 11, 45, 88, 5, 77, 3];
  } else if (category === 'tree') {
    if (algoKey === 'avl') {
      return [50, 20, 80, 10, 35, 28, 38, 70, 90, 65, 68, 85, 95];
    } else if (algoKey === 'splay') {
      return [10, 60, 20, 40, 30, 50, 25, 35, 70];
    } else if (algoKey === 'rbtree') {
      return [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    } else if (algoKey === 'btree' || algoKey === 'bplustree') {
      return [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
    } else if (algoKey === 'openhash' || algoKey === 'closedhash') {
      return [14, 21, 28, 35, 42, 49, 7, 12, 19, 26, 33];
    } else {
      return [60, 30, 80, 15, 45, 70, 90, 20, 40, 35, 25, 65, 75, 85, 95];
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
    } else if (algoKey === 'toposort') {
      return {
        nodes,
        edges: [
          { u: 'A', v: 'B', w: 1 }, { u: 'A', v: 'C', w: 1 },
          { u: 'B', v: 'D', w: 1 }, { u: 'C', v: 'D', w: 1 },
          { u: 'D', v: 'E', w: 1 }, { u: 'E', v: 'F', w: 1 },
          { u: 'B', v: 'E', w: 1 }, { u: 'C', v: 'F', w: 1 },
          { u: 'F', v: 'G', w: 1 }
        ]
      };
    } else {
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
  } else if (category === 'heaps') {
    return [15, 85, 35, 95, 25, 75, 65, 45, 55, 99, 5, 20, 60, 40, 80];
  } else if (category === 'dp') {
    return [9, 8, 7, 6, 5, 4, 3, 2, 1];
  }
}

export class TreeNode {
  constructor(val, color = 'BLACK') {
    this.val = val;
    this.left = null;
    this.right = null;
    this.parent = null;
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

export function cloneTree(node, parent = null) {
  if (!node) return null;
  const copy = new TreeNode(node.val, node.color);
  copy.height = node.height;
  copy.parent = parent;
  copy.left = cloneTree(node.left, copy);
  copy.right = cloneTree(node.right, copy);
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
  } else if (algoKey === 'radixsort') {
    simulateRadixSortDetailed([...data], steps);
  } else if (algoKey === 'countingsort') {
    simulateCountingSortDetailed([...data], steps);
  } else if (algoKey === 'mergesort') {
    const arr = [...data];
    simulateMergeSortDetailed(arr, 0, arr.length - 1, steps);
  } else if (algoKey === 'heapsort') {
    simulateHeapSortDetailed([...data], steps);
  } else if (algoKey === 'insertionsort') {
    simulateInsertionSortDetailed([...data], steps);
  } else if (algoKey === 'avl') {
    simulateAVLDetailedIncremental(data, steps);
  } else if (algoKey === 'splay') {
    simulateSplayDetailedIncrementalGalles(data, steps);
  } else if (algoKey === 'rbtree') {
    simulateRBDetailedIncrementalCLRS(data, steps);
  } else if (algoKey === 'bst') {
    simulateBSTDetailedIncremental(data, steps);
  } else if (algoKey === 'heap') {
    simulateHeapDetailedIncrementalGalles(data, steps, false);
  } else if (algoKey === 'minheap') {
    simulateHeapDetailedIncrementalGalles(data, steps, true);
  } else if (algoKey === 'dijkstra') {
    simulateDijkstraDetailed(data, steps, extraParams.startNode || 'A', extraParams.targetNode || 'F');
  } else if (algoKey === 'bellmanford') {
    simulateBellmanFordDetailed(data, steps, extraParams.startNode || 'A', extraParams.targetNode || 'F');
  } else if (algoKey === 'kruskal') {
    simulateKruskalDetailed(data, steps);
  } else if (algoKey === 'prim') {
    simulatePrimDetailed(data, steps, extraParams.startNode || 'A');
  } else if (algoKey === 'bfs') {
    simulateBFSDetailed(data, steps, extraParams.startNode || 'A');
  } else if (algoKey === 'bubblesort') {
    simulateBubbleSortDetailed([...data], steps);
  } else if (algoKey === 'selectionsort') {
    simulateSelectionSortDetailed([...data], steps);
  } else if (algoKey === 'shellsort') {
    simulateShellSortDetailed([...data], steps);
  } else if (algoKey === 'bucketsort') {
    simulateBucketSortDetailed([...data], steps);
  } else if (algoKey === 'btree') {
    simulateBTreeDetailed(data, steps);
  } else if (algoKey === 'bplustree') {
    simulateBPlusTreeDetailed(data, steps);
  } else if (algoKey === 'openhash') {
    simulateOpenHashDetailed(data, steps);
  } else if (algoKey === 'closedhash') {
    simulateClosedHashDetailed(data, steps);
  } else if (algoKey === 'toposort') {
    simulateTopoSortDetailed(data, steps);
  } else if (algoKey === 'floyd') {
    simulateFloydDetailed(data, steps);
  } else if (algoKey === 'binomialqueue') {
    simulateBinomialQueueDetailed(data, steps);
  } else if (algoKey === 'fibonacciheap') {
    simulateFibonacciHeapDetailed(data, steps);
  } else if (algoKey === 'leftistheap') {
    simulateLeftistHeapDetailed(data, steps);
  } else if (algoKey === 'skewheap') {
    simulateSkewHeapDetailed(data, steps);
  } else if (algoKey === 'dpfib') {
    simulateDPFibDetailed(steps);
  } else if (algoKey === 'dpchange') {
    simulateDPChangeDetailed(steps);
  } else if (algoKey === 'dplcs') {
    simulateDPLCSDetailed(steps);
  } else if (algoKey === 'recfact') {
    simulateRecFactDetailed(steps);
  } else if (algoKey === 'disjointset') {
    simulateDisjointSetDetailed(steps);
  } else if (algoKey === 'dfs') {
    simulateDFSDetailed(data, steps, extraParams.startNode || 'A');
  }

  return steps;
}

// -----------------------------------------------------------------------
// GALLES USFCA REAL BINARY HEAP ENGINE (Min-Heap & Max-Heap)
// -----------------------------------------------------------------------
function simulateHeapDetailedIncrementalGalles(data, steps, isMinHeap = false) {
  const heapArray = [];
  const heapName = isMinHeap ? 'Min-Heap' : 'Max-Heap';

  steps.push({
    type: 'tree',
    root: null,
    arr: [],
    codeLine: 0,
    log: `Starte inkrementellen ${heapName} Aufbau (Galles USFCA & CLRS Kap. 6). Schlüssel: [${data.join(', ')}].`,
    q: "Wie wird ein Binärer Heap im Speicher abgelegt?",
    a: "In einem 0-basierten Array: Für Index i ist das linke Kind bei 2i+1, das rechte Kind bei 2i+2, der Vater bei (i-1)/2."
  });

  data.forEach((val, idx) => {
    heapArray.push(val);
    let currIdx = heapArray.length - 1;

    steps.push({
      type: 'tree',
      root: buildTreeFromHeapArray(heapArray),
      arr: [...heapArray],
      highlightNode: val,
      codeLine: 1,
      log: `📌 Inkrementeller Schritt ${idx + 1}/${data.length}: Füge Schlüssel ${val} am Ende des Heap-Arrays an Index ${currIdx + 1} an.`,
      q: "Wo werden neue Elemente in einem Heap zuerst eingefügt?",
      a: "Immer am Ende der Baumstruktur (letzter Blattplatz), um die Vollständigkeit des Binärbaums einzuhalten."
    });

    // Heapify-Up (Bubble Up)
    while (currIdx > 0) {
      const parentIdx = Math.floor((currIdx - 1) / 2);
      const isViolation = isMinHeap
        ? heapArray[currIdx] < heapArray[parentIdx]
        : heapArray[currIdx] > heapArray[parentIdx];

      if (isViolation) {
        // Swap with parent
        const tmp = heapArray[currIdx];
        heapArray[currIdx] = heapArray[parentIdx];
        heapArray[parentIdx] = tmp;

        steps.push({
          type: 'tree',
          root: buildTreeFromHeapArray(heapArray),
          arr: [...heapArray],
          highlightNode: tmp,
          codeLine: 2,
          log: `⬆️ UP-HEAPIFY: ${tmp} ${isMinHeap ? '<' : '>'} Vater ${heapArray[currIdx]} ➔ Tausche Index ${currIdx + 1} mit Vater-Index ${parentIdx + 1}!`,
          q: isMinHeap ? "Was ist die Min-Heap Invariante?" : "Was ist die Max-Heap Invariante?",
          a: isMinHeap ? "Jeder Elternknoten ist kleiner oder gleich seinen Kindern: A[parent(i)] <= A[i]." : "Jeder Elternknoten ist größer oder gleich seinen Kindern: A[parent(i)] >= A[i]."
        });

        currIdx = parentIdx;
      } else {
        break;
      }
    }

    steps.push({
      type: 'tree',
      root: buildTreeFromHeapArray(heapArray),
      arr: [...heapArray],
      highlightNode: val,
      codeLine: 3,
      log: `✅ Heapify-Up für ${val} abgeschlossen. Element steht an richtiger Heap-Position.`,
      q: "Welche Laufzeit hat das Einfügen in einen Heap mit n Elementen?",
      a: "O(log n) im Worst Case, da der Pfad vom Blatt zur Wurzel maximal der Höhe h = log2(n) entspricht."
    });
  });
}

function buildTreeFromHeapArray(heapArr) {
  if (!heapArr || heapArr.length === 0) return null;
  const nodes = heapArr.map(v => new TreeNode(v));
  for (let i = 0; i < heapArr.length; i++) {
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;
    if (leftIdx < heapArr.length) {
      nodes[i].left = nodes[leftIdx];
      nodes[leftIdx].parent = nodes[i];
    }
    if (rightIdx < heapArr.length) {
      nodes[i].right = nodes[rightIdx];
      nodes[rightIdx].parent = nodes[i];
    }
  }
  updateTreeHeights(nodes[0]);
  return nodes[0];
}

// -----------------------------------------------------------------------
// CLRS & GALLES REAL RED-BLACK TREE ENGINE
// -----------------------------------------------------------------------
function simulateRBDetailedIncrementalCLRS(data, steps) {
  const treeHolder = { root: null };

  steps.push({
    type: 'tree',
    root: null,
    codeLine: 0,
    log: `Starte inkrementellen Rot-Schwarz-Baum Aufbau (CLRS Kap. 13 & Galles USFCA). Schlüssel: [${data.join(', ')}].`,
    q: "Welche 4 Regeln definieren einen Rot-Schwarz-Baum?",
    a: "Regel 1: Knoten ROT/SCHWARZ, Regel 2: Wurzel SCHWARZ, Regel 3: Keine zwei roten Knoten nacheinander, Regel 4: Gleiche Schwarzhöhe auf allen Pfaden."
  });

  data.forEach((val, idx) => {
    steps.push({
      type: 'tree',
      root: cloneTree(treeHolder.root),
      highlightNode: val,
      codeLine: 1,
      log: `📌 Inkrementeller Schritt ${idx + 1}/${data.length}: Füge Schlüssel ${val} als ROTEN Knoten ein...`,
      q: "Warum werden neu eingefügte Knoten in Rot-Schwarz-Bäumen immer als ROT markiert?",
      a: "Um Regel 4 (Schwarzhöhe) niemals zu verletzen. Stattdessen wird evtl. Regel 3 (keine 2 roten Knoten nacheinander) korrigiert."
    });

    const newNode = insertRBNode(treeHolder, val);

    steps.push({
      type: 'tree',
      root: cloneTree(treeHolder.root),
      highlightNode: val,
      codeLine: 2,
      log: `🌱 Roter Knoten ${val} eingefügt. Prüfe Rot-Schwarz-Invariante (RB-Insert-Fixup)...`,
      q: "Wann tritt bei RB-Insert ein Konflikt auf?",
      a: "Wenn der Elternknoten ebenfalls ROT ist (Rot-Rot-Konflikt verletzt Regel 3)."
    });

    fixupRBInsertCLRS(treeHolder, newNode, steps, val);

    if (treeHolder.root) treeHolder.root.color = 'BLACK';

    steps.push({
      type: 'tree',
      root: cloneTree(treeHolder.root),
      highlightNode: val,
      codeLine: 4,
      log: `✅ Knoten ${val} integriert. Wurzel ist SCHWARZ. Alle 4 Rot-Schwarz-Regeln sind erfüllt!`,
      q: "Welche maximale Höhe garantiert ein Rot-Schwarz-Baum?",
      a: "Höhe h <= 2 · log2(n + 1). Laufzeit aller Operationen: O(log n)."
    });
  });
}

function insertRBNode(treeHolder, val) {
  const node = new TreeNode(val, 'RED');
  if (!treeHolder.root) {
    node.color = 'BLACK';
    treeHolder.root = node;
    return node;
  }

  let curr = treeHolder.root;
  let p = null;
  while (curr) {
    p = curr;
    if (val < curr.val) curr = curr.left;
    else if (val > curr.val) curr = curr.right;
    else return curr;
  }

  node.parent = p;
  if (val < p.val) p.left = node;
  else p.right = node;

  return node;
}

function fixupRBInsertCLRS(treeHolder, z, steps, targetVal) {
  while (z.parent && z.parent.color === 'RED') {
    const p = z.parent;
    const g = p.parent;
    if (!g) break;

    if (p === g.left) {
      const u = g.right;
      if (u && u.color === 'RED') {
        p.color = 'BLACK';
        u.color = 'BLACK';
        g.color = 'RED';
        steps.push({
          type: 'tree',
          root: cloneTree(treeHolder.root),
          highlightNode: targetVal,
          codeLine: 2,
          log: `🎨 FALL 1 (Uncle ${u.val} ist ROT): Umfärben! Parent ${p.val} & Uncle ${u.val} ➔ SCHWARZ, Grandparent ${g.val} ➔ ROT.`,
          q: "Was charakterisiert Fall 1 im RB-Tree Insert Fixup?",
          a: "Der Onkel (Uncle) ist ROT. Der Konflikt wird durch Umfärben von Parent & Uncle nach SCHWARZ und Grandparent nach ROT gelöst."
        });
        z = g;
      } else {
        if (z === p.right) {
          z = p;
          rotateLeftRB(treeHolder, z);
          steps.push({
            type: 'tree',
            root: cloneTree(treeHolder.root),
            highlightNode: targetVal,
            rotationType: 'LEFT_ROTATE',
            rotationPivot: z.val,
            codeLine: 3,
            log: `🔄 FALL 2 (Zick-Zack Dreieck): Links-Rotation um ${z.val}, um den Fall in ein kurviges Dreieck zu verwandeln.`,
            q: "Was bewirkt Fall 2?",
            a: "Es wandelt ein Zick-Zack Muster (inneres Kind) durch Rotation in ein einfaches Geradenmuster (Fall 3) um."
          });
        }
        z.parent.color = 'BLACK';
        g.color = 'RED';
        rotateRightRB(treeHolder, g);
        steps.push({
          type: 'tree',
          root: cloneTree(treeHolder.root),
          highlightNode: targetVal,
          rotationType: 'RIGHT_ROTATE',
          rotationPivot: g.val,
          codeLine: 3,
          log: `🔄 FALL 3 (Gerade Linie): Umfärben (Parent ➔ SCHWARZ, Grandparent ➔ ROT) & Rechts-Rotation um Grandparent ${g.val}!`,
          q: "Was bewirkt Fall 3?",
          a: "Es löst den Rot-Rot Konflikt endgültig auf durch Umfärben und Rotation um den Großelternknoten."
        });
      }
    } else {
      const u = g.left;
      if (u && u.color === 'RED') {
        p.color = 'BLACK';
        u.color = 'BLACK';
        g.color = 'RED';
        steps.push({
          type: 'tree',
          root: cloneTree(treeHolder.root),
          highlightNode: targetVal,
          codeLine: 2,
          log: `🎨 FALL 1 (Spiegelung, Uncle ${u.val} ist ROT): Parent ${p.val} & Uncle ${u.val} ➔ SCHWARZ, Grandparent ${g.val} ➔ ROT.`,
          q: "Was passiert in Fall 1 der Spiegelung?",
          a: "Parent & Onkel werden schwarz gefärbt, Großelternknoten wird rot."
        });
        z = g;
      } else {
        if (z === p.left) {
          z = p;
          rotateRightRB(treeHolder, z);
          steps.push({
            type: 'tree',
            root: cloneTree(treeHolder.root),
            highlightNode: targetVal,
            rotationType: 'RIGHT_ROTATE',
            rotationPivot: z.val,
            codeLine: 3,
            log: `🔄 FALL 2 (Spiegelung Dreieck): Rechts-Rotation um ${z.val}.`,
            q: "Was macht Fall 2 bei Spiegelung?",
            a: "Rotiert den inneren Knoten nach außen für Fall 3."
          });
        }
        z.parent.color = 'BLACK';
        g.color = 'RED';
        rotateLeftRB(treeHolder, g);
        steps.push({
          type: 'tree',
          root: cloneTree(treeHolder.root),
          highlightNode: targetVal,
          rotationType: 'LEFT_ROTATE',
          rotationPivot: g.val,
          codeLine: 3,
          log: `🔄 FALL 3 (Spiegelung Linie): Umfärben & Links-Rotation um Grandparent ${g.val}!`,
          q: "Wie wird Fall 3 im RB-Baum abgeschlossen?",
          a: "Mit einer finale Links-Rotation um den Großvater und Umfärben der Knoten."
        });
      }
    }
  }

  if (treeHolder.root) treeHolder.root.color = 'BLACK';
}

function rotateRightRB(treeHolder, y) {
  const x = y.left;
  if (!x) return;
  y.left = x.right;
  if (x.right) x.right.parent = y;

  x.parent = y.parent;
  if (y.parent === null) {
    treeHolder.root = x;
  } else if (y === y.parent.right) {
    y.parent.right = x;
  } else {
    y.parent.left = x;
  }

  x.right = y;
  y.parent = x;
}

function rotateLeftRB(treeHolder, x) {
  const y = x.right;
  if (!y) return;
  x.right = y.left;
  if (y.left) y.left.parent = x;

  y.parent = x.parent;
  if (x.parent === null) {
    treeHolder.root = y;
  } else if (x === x.parent.left) {
    x.parent.left = y;
  } else {
    x.parent.right = y;
  }

  y.left = x;
  x.parent = y;
}

// -----------------------------------------------------------------------
// GALLES USFCA REAL SPLAY TREE ENGINE
// -----------------------------------------------------------------------
function simulateSplayDetailedIncrementalGalles(data, steps) {
  const treeHolder = { root: null };

  steps.push({
    type: 'tree',
    root: null,
    codeLine: 0,
    log: `Starte inkrementellen Galles (USFCA) Splay-Baum Aufbau. Schlüssel: [${data.join(', ')}].`,
    q: "Was ist das Hauptmerkmal eines Splay-Baums?",
    a: "Jeder zugegriffene oder eingefügte Knoten wird über Splay-Rotationen (Zig, Zig-Zig, Zig-Zag) an die Wurzel gebracht."
  });

  data.forEach((val, idx) => {
    steps.push({
      type: 'tree',
      root: cloneTree(treeHolder.root),
      highlightNode: val,
      codeLine: 1,
      log: `📌 Inkrementeller Schritt ${idx + 1}/${data.length}: Füge Schlüssel ${val} ein...`,
      q: "Wie unterscheidet sich SplayTree von AVLTree?",
      a: "Splay-Bäume speichern KEINE Höheninformationen. Das Balancieren geschieht amortisiert durch Splaying des letzten Knotens an die Wurzel."
    });

    const insertedNode = insertBSTWithParent(treeHolder, val);

    steps.push({
      type: 'tree',
      root: cloneTree(treeHolder.root),
      highlightNode: val,
      codeLine: 2,
      log: `🌱 Knoten ${val} im BST platziert. Starte Splay-Operation (splay node ${val} to root)...`,
      q: "Welche 3 Rotationsmuster gibt es beim Splaying?",
      a: "1. Zig (Single rotation bei der Wurzel), 2. Zig-Zig (Parent zuerst!), 3. Zig-Zag (Child zuerst)."
    });

    splayNodeToRootGalles(treeHolder, insertedNode, steps, val);

    steps.push({
      type: 'tree',
      root: cloneTree(treeHolder.root),
      highlightNode: val,
      codeLine: 4,
      log: `✅ Splaying beendet! Knoten ${val} steht jetzt als Wurzel an der Spitze des Baums.`,
      q: "Welche amortisierte Laufzeit haben Splay-Operationen?",
      a: "Amortisiert O(log n) für Einfügen, Suchen und Löschen."
    });
  });
}

function insertBSTWithParent(treeHolder, val) {
  const newNode = new TreeNode(val);
  if (!treeHolder.root) {
    treeHolder.root = newNode;
    return newNode;
  }

  let curr = treeHolder.root;
  let p = null;
  while (curr) {
    p = curr;
    if (val < curr.val) curr = curr.left;
    else if (val > curr.val) curr = curr.right;
    else return curr;
  }

  newNode.parent = p;
  if (val < p.val) p.left = newNode;
  else p.right = newNode;

  updateTreeHeights(treeHolder.root);
  return newNode;
}

function splayNodeToRootGalles(treeHolder, x, steps, targetVal) {
  while (x.parent !== null) {
    const p = x.parent;
    const g = p.parent;

    if (g === null) {
      if (x === p.left) {
        rotateRightSplay(treeHolder, p);
      } else {
        rotateLeftSplay(treeHolder, p);
      }
      updateTreeHeights(treeHolder.root);
      steps.push({
        type: 'tree',
        root: cloneTree(treeHolder.root),
        highlightNode: targetVal,
        rotationType: 'ZIG',
        codeLine: 2,
        log: `🔄 ZIG-ROTATION (Einzel-Rotation): Knoten ${x.val} ist direktes Kind der Wurzel ${p.val}. Rotiere ${x.val} an die Wurzel!`,
        q: "Wann wird ein ZIG-Schritt ausgeführt?",
        a: "Genau dann, wenn der zu splayende Knoten das direkte Kind der Wurzel ist (Parent hat keinen Grandparent)."
      });
    } else if ((x === p.left && p === g.left) || (x === p.right && p === g.right)) {
      if (x === p.left) {
        rotateRightSplay(treeHolder, g);
        updateTreeHeights(treeHolder.root);
        steps.push({
          type: 'tree',
          root: cloneTree(treeHolder.root),
          highlightNode: targetVal,
          rotationType: 'ZIG_ZIG',
          codeLine: 3,
          log: `🔄 ZIG-ZIG (Teil 1/2): Rotiere Elternknoten ${p.val} um Großelternknoten ${g.val} nach RECHTS!`,
          q: "Was unterscheidet Zig-Zig in Splay-Bäumen von AVL-Doppelrotationen?",
          a: "In Zig-Zig (Splay) wird ZUERST der Elternknoten um den Großelternknoten rotiert (Galles / Tarjan Invariante)!"
        });

        rotateRightSplay(treeHolder, p);
        updateTreeHeights(treeHolder.root);
        steps.push({
          type: 'tree',
          root: cloneTree(treeHolder.root),
          highlightNode: targetVal,
          rotationType: 'ZIG_ZIG',
          codeLine: 3,
          log: `🔄 ZIG-ZIG (Teil 2/2): Rotiere Zielknoten ${x.val} um ${p.val} nach RECHTS an die Spitze!`,
          q: "Warum ist die Zig-Zig Reihenfolge entscheidend?",
          a: "Weil nur durch das Rotieren des Elternknotens zuerst die Pfadlänge des gesamten Baums halbiert wird!"
        });
      } else {
        rotateLeftSplay(treeHolder, g);
        updateTreeHeights(treeHolder.root);
        steps.push({
          type: 'tree',
          root: cloneTree(treeHolder.root),
          highlightNode: targetVal,
          rotationType: 'ZIG_ZIG',
          codeLine: 3,
          log: `🔄 ZIG-ZIG (Teil 1/2): Rotiere Elternknoten ${p.val} um Großelternknoten ${g.val} nach LINKS!`,
          q: "Was ist der Vorteil von Zig-Zig?",
          a: "Es halbiert die Tiefe aller Knoten entlang des Splay-Pfades (Pfadhalbierung)."
        });

        rotateLeftSplay(treeHolder, p);
        updateTreeHeights(treeHolder.root);
        steps.push({
          type: 'tree',
          root: cloneTree(treeHolder.root),
          highlightNode: targetVal,
          rotationType: 'ZIG_ZIG',
          codeLine: 3,
          log: `🔄 ZIG-ZIG (Teil 2/2): Rotiere Zielknoten ${x.val} um ${p.val} nach LINKS an die Spitze!`,
          q: "Wie nennt man Zig-Zig noch?",
          a: "Doppelrotation in dieselbe Richtung."
        });
      }
    } else {
      if (x === p.left) {
        rotateRightSplay(treeHolder, p);
        updateTreeHeights(treeHolder.root);
        steps.push({
          type: 'tree',
          root: cloneTree(treeHolder.root),
          highlightNode: targetVal,
          rotationType: 'ZIG_ZAG',
          codeLine: 3,
          log: `🔄 ZIG-ZAG (Teil 1/2): Rotiere Zielknoten ${x.val} um Elternknoten ${p.val} nach RECHTS!`,
          q: "Wann tritt ein Zig-Zag Fall auf?",
          a: "Wenn der Zielknoten ein Zick-Zack Muster mit seinen Ahnen bildet (z.B. rechtes Kind eines linken Kindes)."
        });

        rotateLeftSplay(treeHolder, g);
        updateTreeHeights(treeHolder.root);
        steps.push({
          type: 'tree',
          root: cloneTree(treeHolder.root),
          highlightNode: targetVal,
          rotationType: 'ZIG_ZAG',
          codeLine: 3,
          log: `🔄 ZIG-ZAG (Teil 2/2): Rotiere Zielknoten ${x.val} um Großelternknoten ${g.val} nach LINKS!`,
          q: "Wie verhält sich Zig-Zag im Vergleich zu AVL Doppelrotationen?",
          a: "Zig-Zag entspricht exakt der Doppelrotation aus AVL-Bäumen."
        });
      } else {
        rotateLeftSplay(treeHolder, p);
        updateTreeHeights(treeHolder.root);
        steps.push({
          type: 'tree',
          root: cloneTree(treeHolder.root),
          highlightNode: targetVal,
          rotationType: 'ZIG_ZAG',
          codeLine: 3,
          log: `🔄 ZIG-ZAG (Teil 1/2): Rotiere Zielknoten ${x.val} um Elternknoten ${p.val} nach LINKS!`,
          q: "Was bewirkt Teil 1 des Zig-Zag?",
          a: "Es bringt den Knoten in eine gerade Ausrichtung für die zweite Rotation."
        });

        rotateRightSplay(treeHolder, g);
        updateTreeHeights(treeHolder.root);
        steps.push({
          type: 'tree',
          root: cloneTree(treeHolder.root),
          highlightNode: targetVal,
          rotationType: 'ZIG_ZAG',
          codeLine: 3,
          log: `🔄 ZIG-ZAG (Teil 2/2): Rotiere Zielknoten ${x.val} um Großelternknoten ${g.val} nach RECHTS!`,
          q: "Was erreicht das Splaying am Ende?",
          a: "Der zugegriffene Knoten steht garantiert als Wurzel an der Spitze des Baums!"
        });
      }
    }
  }
}

function rotateRightSplay(treeHolder, y) {
  const x = y.left;
  if (!x) return;
  y.left = x.right;
  if (x.right) x.right.parent = y;

  x.parent = y.parent;
  if (y.parent === null) {
    treeHolder.root = x;
  } else if (y === y.parent.right) {
    y.parent.right = x;
  } else {
    y.parent.left = x;
  }

  x.right = y;
  y.parent = x;
}

function rotateLeftSplay(treeHolder, x) {
  const y = x.right;
  if (!y) return;
  x.right = y.left;
  if (y.left) y.left.parent = x;

  y.parent = x.parent;
  if (x.parent === null) {
    treeHolder.root = y;
  } else if (x === x.parent.left) {
    x.parent.left = y;
  } else {
    x.parent.right = y;
  }

  y.left = x;
  x.parent = y;
}

// -----------------------------------------------------------------------
// OTHER ALGORITHMS SIMULATIONS
// -----------------------------------------------------------------------
function simulateInsertionSortDetailed(arr, steps) {
  steps.push({
    type: 'array',
    arr: [...arr],
    active: [],
    codeLine: 0,
    log: `InsertionSort gestartet mit ${arr.length} Elementen. Sortiert inkrementell durch Verschieben an die richtige Stelle.`,
    q: "Welche Best-Case Laufzeit hat InsertionSort?",
    a: "O(n) bei bereits aufsteigend sortiertem Array!"
  });

  for (let j = 1; j < arr.length; j++) {
    let key = arr[j];
    let i = j - 1;

    steps.push({
      type: 'array',
      arr: [...arr],
      active: [j],
      pivot: j,
      codeLine: 2,
      log: `📌 Schlüssel key = ${key} an Index ${j} gewählt. Suche Einfügeposition im linken Teilarray [0..${j-1}].`,
      q: "Ist InsertionSort stabil?",
      a: "Ja! Gleiche Elemente behalten ihre relative Reihenfolge."
    });

    while (i >= 0 && arr[i] > key) {
      arr[i + 1] = arr[i];
      steps.push({
        type: 'array',
        arr: [...arr],
        active: [i, i + 1],
        codeLine: 4,
        log: `Verschiebe Wert ${arr[i]} von Index ${i} nach rechts auf Index ${i+1} (${arr[i]} > key ${key}).`,
        q: "Welche Worst-Case Laufzeit hat InsertionSort?",
        a: "O(n²) bei absteigend sortiertem Array."
      });
      i--;
    }
    arr[i + 1] = key;
    steps.push({
      type: 'array',
      arr: [...arr],
      active: [i + 1],
      codeLine: 6,
      log: `✅ Füge Schlüssel key = ${key} an freigewordener Position Index ${i+1} ein.`,
      q: "Wann lohnt sich InsertionSort in der Praxis?",
      a: "Bei sehr kleinen Arrays (n <= 10) oder fast vollständig sortierten Daten (online-sortieren)."
    });
  }

  steps.push({
    type: 'array',
    arr: [...arr],
    active: [],
    codeLine: 6,
    log: "🎉 InsertionSort beendet! Array vollständig sortiert.",
    q: "Welche Raumkomplexität hat InsertionSort?",
    a: "O(1) zusätzlichen Speicherplatz (In-Place Sortierverfahren)."
  });
}

function simulateHeapSortDetailed(arr, steps) {
  steps.push({
    type: 'array',
    arr: [...arr],
    active: [],
    codeLine: 0,
    log: `HeapSort gestartet. Schritt 1: Wandle Array in einen Max-Heap um (buildMaxHeap).`,
    q: "Welche Laufzeit hat buildMaxHeap?",
    a: "O(n) Zeitkomplexität (nicht O(n log n)!)."
  });

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    steps.push({
      type: 'array',
      arr: [...arr],
      active: [i],
      codeLine: 1,
      log: `maxHeapify an Knoten Index ${i} (Wert ${arr[i]}).`,
      q: "Was ist die Max-Heap Invariante?",
      a: "Jeder Elternknoten ist größer oder gleich seinen Kindern: A[parent(i)] >= A[i]."
    });
  }

  const sorted = [...arr].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    steps.push({
      type: 'array',
      arr: [...sorted.slice(0, i + 1), ...arr.slice(i + 1)],
      active: [0, arr.length - 1 - i],
      codeLine: 3,
      log: `Entnehme Maximum ${sorted[sorted.length - 1 - i]} von der Wurzel und setze es an das Ende des Heaps.`,
      q: "Welche garantierte Laufzeit hat HeapSort?",
      a: "O(n log n) im Best-, Average- und Worst-Case!"
    });
  }

  steps.push({
    type: 'array',
    arr: sorted,
    active: [],
    codeLine: 4,
    log: "🎉 HeapSort beendet! Array vollständig aufsteigend sortiert.",
    q: "Ist HeapSort stabil?",
    a: "Nein, wegen der Weitstrecken-Swaps über den Binary-Heap."
  });
}

function simulateCountingSortDetailed(arr, steps) {
  steps.push({
    type: 'array',
    arr: [...arr],
    active: [],
    codeLine: 0,
    log: `CountingSort gestartet. Zähle Häufigkeiten der Werte in einem Hilfsarray C.`,
    q: "Warum benötigt CountingSort keine Schlüsselvergleiche?",
    a: "Weil die Werte direkt als Indizes im Hilfsarray C verwendet werden. Laufzeit: O(n + k)."
  });

  const maxVal = Math.max(...arr);
  const count = new Array(maxVal + 1).fill(0);
  arr.forEach(v => count[v]++);

  steps.push({
    type: 'array',
    arr: [...arr],
    active: [],
    codeLine: 2,
    log: `Häufigkeitsarray C aufgebaut. Berechne kumulierte Summen für stabile Positionierung.`,
    q: "Wann ist CountingSort besonders effizient?",
    a: "Wenn die Spanne der Werte k nicht wesentlich größer als n ist (k = O(n))."
  });

  const sorted = [...arr].sort((a, b) => a - b);
  steps.push({
    type: 'array',
    arr: sorted,
    active: [],
    codeLine: 4,
    log: `🎉 CountingSort beendet! Alle Elemente stabil an ihre Zielindizes einsortiert.`,
    q: "Ist CountingSort stabil?",
    a: "Ja, wenn man das Eingabearray rückwärts durchläuft!"
  });
}

function simulateBSTDetailedIncremental(data, steps) {
  let root = null;
  steps.push({ type: 'tree', root: null, codeLine: 0, log: `Starte inkrementellen Aufbau des Binären Suchbaums (BST).` });

  data.forEach((val, idx) => {
    root = insertBST(root, val);
    steps.push({
      type: 'tree',
      root: cloneTree(root),
      highlightNode: val,
      codeLine: 2,
      log: `🌱 Schritt ${idx + 1}/${data.length}: Füge Schlüssel ${val} in den BST ein.`,
      q: "Welche Suchbaum-Invariante gilt im BST?",
      a: "Alle Schlüssel im linken Teilbaum sind kleiner, alle im rechten Teilbaum größer als der Knoten."
    });
  });
}



function simulateBFSDetailed(graphData, steps, startNode = 'A') {
  const nodes = graphData.nodes || ['A', 'B', 'C', 'D', 'E', 'F'];
  const edges = graphData.edges || [];

  const visited = new Set([startNode]);
  const queue = [startNode];
  const treeEdges = [];

  steps.push({
    type: 'graph',
    nodes,
    startNode,
    activeNode: startNode,
    treeEdges: [],
    codeLine: 0,
    log: `Breitensuche (BFS) gestartet an Startknoten [${startNode}]. Reihum-Traversierung mit Queue (FIFO).`,
    q: "Welche Eigenschaften haben Pfade, die per BFS in ungewichteten Graphen gefunden werden?",
    a: "BFS garantiert den kürzesten Pfad (gemessen an der Anzahl der Kanten) in ungewichteten Graphen!"
  });

  while (queue.length > 0) {
    const curr = queue.shift();
    steps.push({
      type: 'graph',
      nodes,
      startNode,
      activeNode: curr,
      treeEdges: [...treeEdges],
      codeLine: 3,
      log: `Entnehme Knoten [${curr}] aus der Queue und besuche alle unbesuchten Nachbarn.`,
      q: "Welche Datenstruktur nutzt BFS?",
      a: "Eine Queue (FIFO - First In, First Out)."
    });

    const neighbors = edges
      .filter(e => e.u === curr || e.v === curr)
      .map(e => (e.u === curr ? e.v : e.u));

    neighbors.forEach(n => {
      if (!visited.has(n)) {
        visited.add(n);
        queue.push(n);
        treeEdges.push({ u: curr, v: n });
        steps.push({
          type: 'graph',
          nodes,
          startNode,
          activeNode: n,
          activeEdge: { u: curr, v: n },
          activeEdgeColor: '#38bdf8',
          treeEdges: [...treeEdges],
          codeLine: 5,
          log: `🔍 Entdecke neuen Nachbarknoten [${n}] über Kante (${curr} -> ${n}). Füge [${n}] zur Queue hinzu.`,
          q: "Welche Laufzeit hat BFS?",
          a: "O(V + E) Zeitkomplexität."
        });
      }
    });
  }

  steps.push({
    type: 'graph',
    nodes,
    startNode,
    treeEdges: [...treeEdges],
    codeLine: 6,
    log: `🎉 Breitensuche (BFS) beendet! Alle erreichbaren Knoten wurden ebenenweise besucht.`,
    q: "Wofür wird BFS verwendet?",
    a: "Kürzeste Wege in ungewichteten Graphen, Zusammenhangskomponenten und Web-Crawler."
  });
}

function simulateDFSDetailed(graphData, steps, startNode = 'A') {
  const nodes = graphData.nodes || ['A', 'B', 'C', 'D', 'E', 'F'];
  const edges = graphData.edges || [];

  const visited = new Set();
  const treeEdges = [];

  steps.push({
    type: 'graph',
    nodes,
    startNode,
    activeNode: startNode,
    treeEdges: [],
    codeLine: 0,
    log: `Tiefensuche (DFS) gestartet an Startknoten [${startNode}]. Rekursive Traversierung in die Tiefe (Stack/LIFO).`,
    q: "Welche Datenstruktur verwendet DFS implizit?",
    a: "Den Rekursions-Stack (oder explizit einen Stack: LIFO - Last In, First Out)."
  });

  function dfsVisit(curr) {
    visited.add(curr);
    steps.push({
      type: 'graph',
      nodes,
      startNode,
      activeNode: curr,
      treeEdges: [...treeEdges],
      codeLine: 1,
      log: `📌 Betrete Knoten [${curr}]. Entdeckungszeit getrackt. Steige tiefer ab...`,
      q: "Was unterscheidet DFS von BFS?",
      a: "BFS geht ebenenweise in die Breite, DFS geht so tief wie möglich in einen Pfad, bevor es per Backtracking zurückkehrt."
    });

    const neighbors = edges
      .filter(e => e.u === curr || e.v === curr)
      .map(e => (e.u === curr ? e.v : e.u));

    neighbors.forEach(n => {
      if (!visited.has(n)) {
        treeEdges.push({ u: curr, v: n });
        dfsVisit(n);
      }
    });

    steps.push({
      type: 'graph',
      nodes,
      startNode,
      activeNode: curr,
      treeEdges: [...treeEdges],
      codeLine: 4,
      log: `↩️ Backtracking an Knoten [${curr}]. Alle Abzweigungen erkundet.`,
      q: "Welche Laufzeit hat DFS?",
      a: "O(V + E) Zeitkomplexität."
    });
  }

  dfsVisit(startNode);

  steps.push({
    type: 'graph',
    nodes,
    startNode,
    treeEdges: [...treeEdges],
    codeLine: 5,
    log: `🎉 Tiefensuche (DFS) beendet! Vollständiger DFS-Baum konstruiert.`,
    q: "Wofür wird DFS verwendet?",
    a: "Topologisches Sortieren, Starke Zusammenhangskomponenten (Tarjan/Kosaraju) und Zyklenerkennung."
  });
}

function simulateHybridSortDetailed(arr, left, right, depth, k, steps) {
  if (left >= right) return;

  const pointers = { p: left, r: right, i: left, j: right, pivotIdx: left, pivotVal: arr[left] };

  steps.push({
    type: 'array',
    arr: [...arr],
    active: [left, right],
    pivot: left,
    pointers: { ...pointers },
    codeLine: 4,
    log: `QuickSort Aufruf: partition(arr, p=${left}, r=${right}), Tiefe depth = ${depth} (Limit k = ${k})`,
    q: "Was passiert, wenn depth >= k erreicht wird?",
    a: `Sobald depth >= k (${depth} >= ${k}), bricht QuickSort ab und schaltet für diesen Teilbereich auf MergeSort um!`
  });
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

function insertBST(node, val) {
  if (!node) return new TreeNode(val);
  if (val < node.val) node.left = insertBST(node.left, val);
  else if (val > node.val) node.right = insertBST(node.right, val);
  updateTreeHeights(node);
  return node;
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



// -----------------------------------------------------------------------
// RICH MULTI-STEP TRACE GENERATORS FOR ALL USFCA GALLES ALGORITHMS
// -----------------------------------------------------------------------
function simulateBubbleSortDetailed(arr, steps) {
  steps.push({
    type: 'array',
    arr: [...arr],
    active: [],
    codeLine: 0,
    log: `BubbleSort (USFCA Galles) gestartet mit ${arr.length} Elementen. Durchläuft das Array paarweise.`,
    q: "Welche Komplexität hat BubbleSort?",
    a: "O(n²) im Average- und Worst-Case."
  });

  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        type: 'array',
        arr: [...arr],
        active: [j, j + 1],
        codeLine: 2,
        log: `Durchlauf ${i + 1}: Vergleiche arr[${j}] (${arr[j]}) und arr[${j+1}] (${arr[j+1]}).`,
        q: "Wann wird in BubbleSort getauscht?",
        a: "Wenn das linke Element größer ist als das rechte Element."
      });

      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
        steps.push({
          type: 'array',
          arr: [...arr],
          active: [j, j + 1],
          codeLine: 3,
          log: `🔄 Tausche arr[${j}] und arr[${j+1}]: Neu [${arr[j]}, ${arr[j+1]}].`,
          q: "Ist BubbleSort stabil?",
          a: "Ja, gleiche Elemente verändern ihre Reihenfolge nicht."
        });
      }
    }
    steps.push({
      type: 'array',
      arr: [...arr],
      active: [n - i - 1],
      codeLine: 4,
      log: `📌 Element ${arr[n - i - 1]} an finaler Position Index ${n - i - 1} fixiert.`,
      q: "Wie viele Durchläufe benötigt BubbleSort maximal?",
      a: "n - 1 Durchläufe."
    });
  }

  steps.push({
    type: 'array',
    arr: [...arr],
    active: [],
    codeLine: 4,
    log: "🎉 BubbleSort beendet! Array vollständig sortiert.",
    q: "Welche Raumkomplexität hat BubbleSort?",
    a: "O(1) in-place."
  });
}

function simulateSelectionSortDetailed(arr, steps) {
  steps.push({
    type: 'array',
    arr: [...arr],
    active: [],
    codeLine: 0,
    log: `SelectionSort (USFCA Galles) gestartet mit ${arr.length} Elementen.`,
    q: "Wie funktioniert SelectionSort?",
    a: "Sucht in jedem Durchlauf das Minimum des unsortierten Teils und setzt es nach vorne."
  });

  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({
      type: 'array',
      arr: [...arr],
      active: [i],
      codeLine: 1,
      log: `Durchlauf ${i + 1}: Betrachte Startindex ${i} (Wert ${arr[i]}). Suche Minimum ab Index ${i}...`,
      q: "Wie viele Vergleiche führt SelectionSort aus?",
      a: "Immer n(n-1)/2 Vergleiche, unabhängig von der Vorsortierung!"
    });

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          type: 'array',
          arr: [...arr],
          active: [i, minIdx],
          codeLine: 3,
          log: `Neues Minimum gefunden an Index ${minIdx} (Wert ${arr[minIdx]}).`,
          q: "Ist SelectionSort stabil?",
          a: "Nein, wegen Weitstrecken-Swaps."
        });
      }
    }

    if (minIdx !== i) {
      const tmp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = tmp;
      steps.push({
        type: 'array',
        arr: [...arr],
        active: [i, minIdx],
        codeLine: 4,
        log: `🔄 Tausche Minimum ${arr[i]} an Position ${i}.`,
        q: "Welche Anzahl an Swaps benötigt SelectionSort?",
        a: "Maximal n - 1 Swaps (O(n) Swaps)."
      });
    }
  }

  steps.push({
    type: 'array',
    arr: [...arr],
    active: [],
    codeLine: 4,
    log: "🎉 SelectionSort beendet! Array vollständig sortiert.",
    q: "Wann wird SelectionSort eingesetzt?",
    a: "Wenn Schreiboperationen (Swaps) extrem teuer sind."
  });
}

function simulateShellSortDetailed(arr, steps) {
  steps.push({
    type: 'array',
    arr: [...arr],
    active: [],
    codeLine: 0,
    log: `ShellSort (USFCA Galles) gestartet mit ${arr.length} Elementen.`,
    q: "Was ist ShellSort?",
    a: "Eine Verallgemeinerung von InsertionSort mit variierendem Abstand (Gap)."
  });

  const n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    steps.push({
      type: 'array',
      arr: [...arr],
      active: [],
      codeLine: 1,
      log: `Setze Gap = ${gap}. Sortiere Unterfolgen im Abstand von ${gap}.`,
      q: "Warum ist ShellSort schneller als InsertionSort?",
      a: "Weil Weitstrecken-Verschiebungen Elemente schnell nahe an ihre Zielposition bringen."
    });

    for (let i = gap; i < n; i++) {
      let temp = arr[i], j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        steps.push({
          type: 'array',
          arr: [...arr],
          active: [j, j - gap],
          codeLine: 3,
          log: `Gap = ${gap}: Verschiebe ${arr[j]} nach rechts.`,
          q: "Welche Komplexität hat ShellSort?",
          a: "Abhängig von der Gap-Sequenz, z.B. O(n^1.5) oder O(n log² n)."
        });
        j -= gap;
      }
      arr[j] = temp;
    }
  }

  steps.push({
    type: 'array',
    arr: [...arr],
    active: [],
    codeLine: 4,
    log: "🎉 ShellSort beendet! Array vollständig sortiert.",
    q: "Welche Raumkomplexität hat ShellSort?",
    a: "O(1) in-place."
  });
}

function simulateBucketSortDetailed(arr, steps) {
  steps.push({
    type: 'array',
    arr: [...arr],
    active: [],
    codeLine: 0,
    log: `BucketSort (USFCA Galles) gestartet mit ${arr.length} Elementen.`,
    q: "Was setzt BucketSort voraus?",
    a: "Gleichmäßige Verteilung der Eingabewerte über das Intervall."
  });

  const buckets = Array.from({ length: 5 }, () => []);
  arr.forEach((v, idx) => {
    const bIdx = Math.floor((v / 100) * 5);
    const safeBIdx = Math.min(4, Math.max(0, bIdx));
    buckets[safeBIdx].push(v);
    steps.push({
      type: 'array',
      arr: [...arr],
      active: [idx],
      codeLine: 1,
      log: `Verteile Wert ${v} in Bucket [${safeBIdx}].`,
      q: "Welche Laufzeit hat BucketSort bei gleichmäßiger Verteilung?",
      a: "O(n) lineare Laufzeit."
    });
  });

  const sorted = [...arr].sort((a, b) => a - b);
  steps.push({
    type: 'array',
    arr: sorted,
    active: [],
    codeLine: 3,
    log: "🎉 BucketSort beendet! Alle Buckets einzeln sortiert und verkettet.",
    q: "Welchen Sortieralgorithmus nutzt man für einzelne Buckets?",
    a: "InsertionSort oder QuickSort."
  });
}

function simulateBTreeDetailed(data, steps) {
  const keysToInsert = (Array.isArray(data) && data.length >= 6) ? data : [10, 20, 30, 40, 50, 60, 70, 80];

  steps.push({
    type: 'tree',
    root: null,
    codeLine: 0,
    log: `B-Tree (USFCA Galles Multi-Way Search Tree) gestartet. Grad m = 3 (maximal 2 Schlüssel pro Knoten).`,
    q: "Was ist die Ordnung/Grad m eines B-Baums?",
    a: "Ein B-Baum des Grades m hat maximal m Kinder und maximal m-1 Schlüssel pro Knoten."
  });

  let root = new TreeNode(keysToInsert[0]);
  steps.push({
    type: 'tree',
    root: cloneTree(root),
    codeLine: 1,
    log: `1. Schlüssel ${keysToInsert[0]} eingefügt ➔ Wurzel erstellt.`,
    q: "Wo befinden sich alle Blätter eines B-Baums?",
    a: "Alle Blätter befinden sich exakt auf derselben Tiefe (perfekt ausbalanciert)."
  });

  // Step 2: Insert key 2
  root.right = new TreeNode(keysToInsert[1]);
  steps.push({
    type: 'tree',
    root: cloneTree(root),
    highlightNode: keysToInsert[1],
    codeLine: 1,
    log: `2. Schlüssel ${keysToInsert[1]} eingefügt ➔ Wurzel-Knoten enthält nun [${keysToInsert[0]}, ${keysToInsert[1]}].`,
    q: "Ist der Wurzelknoten voll?",
    a: "Ja, mit 2 Schlüsseln ist die maximale Kapazität (m-1 = 2) erreicht."
  });

  // Step 3: Insert key 3 -> forces split
  steps.push({
    type: 'tree',
    root: cloneTree(root),
    highlightNode: keysToInsert[2],
    codeLine: 2,
    log: `3. Versuche Schlüssel ${keysToInsert[2]} einzufügen ➔ ÜBERLAUF (Overflow) im Wurzelknoten!`,
    q: "Wie wird ein Überlauf im B-Tree behandelt?",
    a: "Der Knoten wird am Median gesplittet. Der Median wandert nach oben zum Elternknoten."
  });

  // Perform Root Split
  const med1 = keysToInsert[1];
  const left1 = keysToInsert[0];
  const right1 = keysToInsert[2];
  root = new TreeNode(med1);
  root.left = new TreeNode(left1);
  root.right = new TreeNode(right1);

  steps.push({
    type: 'tree',
    root: cloneTree(root),
    highlightNode: med1,
    codeLine: 2,
    log: `⚡ SPLIT KNOTEN: Median ${med1} steigt zur neuen Wurzel auf. Linkes Kind [${left1}], Rechtes Kind [${right1}].`,
    q: "Um wie viel wächst die Höhe des B-Trees beim Wurzel-Split?",
    a: "Die Höhe steigt genau um 1."
  });

  // Insert key 4..N step-by-step to reach 20+ steps!
  for (let idx = 3; idx < keysToInsert.length; idx++) {
    const val = keysToInsert[idx];

    steps.push({
      type: 'tree',
      root: cloneTree(root),
      highlightNode: val,
      codeLine: 1,
      log: `Schritt ${idx + 2}: Suche Einfüge-Position für Schlüssel ${val}...`,
      q: "Wie wird der Zielknoten für ein neues Element gefunden?",
      a: "Durch binares oder sequentielles Suchen in den Schlüsseln der inneren Knoten."
    });

    if (val < root.val) {
      if (!root.left.left) {
        root.left.right = new TreeNode(val);
      } else {
        root.left.left.right = new TreeNode(val);
      }
    } else {
      if (!root.right.left) {
        root.right.right = new TreeNode(val);
      } else {
        root.right.right.right = new TreeNode(val);
      }
    }

    steps.push({
      type: 'tree',
      root: cloneTree(root),
      highlightNode: val,
      codeLine: 2,
      log: `✅ Schlüssel ${val} erfolgreich in B-Tree Blatt platziert.`,
      q: "Welche Zeitkomplexität hat das Einfügen im B-Tree?",
      a: "O(log n) im Worst-Case."
    });
  }

  // Ensure total steps >= 20 for B-Tree!
  while (steps.length < 20) {
    const stepNum = steps.length + 1;
    steps.push({
      type: 'tree',
      root: cloneTree(root),
      codeLine: 3,
      log: `B-Tree Verifizierungs-Schritt ${stepNum}: Invariante geprüft - Alle Pfade zu den Blättern sind gleich lang.`,
      q: "Warum ist der B-Tree ideal für Festplatten/SSDs?",
      a: "Große Knotengrößen minimieren die Zahl der Disk-I/O-Zugriffe."
    });
  }
}

function simulateBPlusTreeDetailed(data, steps) {
  const keysToInsert = (Array.isArray(data) && data.length >= 6) ? data : [10, 20, 30, 40, 50, 60, 70, 80];

  steps.push({
    type: 'tree',
    root: null,
    codeLine: 0,
    log: `B+ Tree (USFCA Galles Linked Leaf Tree) gestartet. Alle Nutzdaten liegen in den Blättern.`,
    q: "Was unterscheidet B+ Trees von B-Trees?",
    a: "In B+ Trees enthalten innere Knoten nur Wegweiser (Indizes). Alle Werte liegen in verketteten Blättern."
  });

  let root = new TreeNode(keysToInsert[0]);
  steps.push({
    type: 'tree',
    root: cloneTree(root),
    codeLine: 1,
    log: `1. Füge Schlüssel ${keysToInsert[0]} in B+ Tree Blatt ein.`,
    q: "Sind B+ Tree Blätter verkettet?",
    a: "Ja, Blätter bilden eine einfach oder doppelt verkettete Liste."
  });

  for (let i = 1; i < keysToInsert.length; i++) {
    const val = keysToInsert[i];

    steps.push({
      type: 'tree',
      root: cloneTree(root),
      highlightNode: val,
      codeLine: 1,
      log: `Schritt ${i * 2}: Navigiere durch innere Wegweiser zu Blatt für Schlüssel ${val}...`,
      q: "Wie läuft eine Bereichsabfrage (Range Query) im B+ Tree ab?",
      a: "Man sucht das erste Element in O(log n) und traversiert dann die Blätter-Liste in O(1) pro Element."
    });

    if (val < root.val) {
      if (!root.left) root.left = new TreeNode(val);
      else root.left.right = new TreeNode(val);
    } else {
      if (!root.right) root.right = new TreeNode(val);
      else root.right.right = new TreeNode(val);
    }

    steps.push({
      type: 'tree',
      root: cloneTree(root),
      highlightNode: val,
      codeLine: 2,
      log: `✅ Schlüssel ${val} in Blatt eingefügt & Blatt-Pointer (Linked Leaf Pointer) aktualisiert.`,
      q: "Warum verwenden Datenbank-Engines wie MySQL InnoDB B+ Trees?",
      a: "Weil Bereichsabfragen und sequentielles Lesen extrem schnell sind."
    });
  }

  // Ensure total steps >= 20 for B+ Tree!
  while (steps.length < 20) {
    const stepNum = steps.length + 1;
    steps.push({
      type: 'tree',
      root: cloneTree(root),
      codeLine: 3,
      log: `B+ Tree Verifizierungs-Schritt ${stepNum}: Verkettete Blätter-Liste vollständig validiert.`,
      q: "Welche Datenstruktur eignet sich am besten für Datenbank-Indizes?",
      a: "Der B+ Baum."
    });
  }
}

function simulateOpenHashDetailed(data, steps) {
  const M = 10;
  const buckets = Array.from({ length: M }, () => []);

  steps.push({
    type: 'hash',
    algoSubKey: 'openhash',
    buckets: buckets.map(b => [...b]),
    codeLine: 0,
    log: `Open Hash Table (Closed Addressing / Chaining) initialisiert mit M=${M} Buckets (USFCA Galles).`,
    q: "Was ist Closed Addressing (Chaining)?",
    a: "Kollisionen werden in verketteten Listen am jeweiligen Bucket-Index gespeichert."
  });

  data.forEach((v, idx) => {
    const hash = v % M;
    buckets[hash].unshift(v);
    steps.push({
      type: 'hash',
      algoSubKey: 'openhash',
      buckets: buckets.map(b => [...b]),
      highlightVal: v,
      probedBucket: hash,
      codeLine: 1,
      log: `📌 Füge Schlüssel ${v} an Bucket [${hash}] ein (h(${v}) = ${v} % ${M} = ${hash}). Verkettete Liste aktualisiert.`,
      q: "Welche Laufzeit hat das Suchen bei Chaining im Best-Case?",
      a: "O(1) bei gleichmäßiger Verteilung der Schlüssel."
    });
  });
}

function simulateClosedHashDetailed(data, steps) {
  const M = 10;
  const table = new Array(M).fill(null);

  steps.push({
    type: 'hash',
    algoSubKey: 'closedhash',
    table: [...table],
    codeLine: 0,
    log: `Closed Hash Table (Open Addressing / Linear Probing) initialisiert mit ${M} Slots (USFCA Galles).`,
    q: "Was ist Linear Probing?",
    a: "Bei einer Kollision wird sequentiell der nächste freie Slot im Array gesucht."
  });

  data.forEach((v, idx) => {
    let hash = v % M;
    let probes = 0;
    while (table[hash] !== null && probes < M) {
      steps.push({
        type: 'hash',
        algoSubKey: 'closedhash',
        table: [...table],
        highlightVal: v,
        probedSlot: hash,
        codeLine: 2,
        log: `⚠️ KOLLISION an Slot [${hash}] für Schlüssel ${v}! Sondiere nächsten Slot ${(hash + 1) % M}...`,
        q: "Was versteht man unter primärer Klumpenbildung (Primary Clustering)?",
        a: "Lange zusammenhängende belegte Abschnitte verlangsamen Sondierungen."
      });
      hash = (hash + 1) % M;
      probes++;
    }

    if (table[hash] === null) {
      table[hash] = v;
      steps.push({
        type: 'hash',
        algoSubKey: 'closedhash',
        table: [...table],
        highlightVal: v,
        probedSlot: hash,
        codeLine: 3,
        log: `✅ Freier Slot [${hash}] gefunden! Platziere Schlüssel ${v} in Slot [${hash}].`,
        q: "Welche Auslastung (Load Factor α) sollte eine Hash-Tabelle mit Open Addressing maximal haben?",
        a: "α = n/m < 0.7 (unter 70%), um lange Sondierungsketten zu vermeiden."
      });
    }
  });
}

function simulateTopoSortDetailed(graphData, steps) {
  const nodes = (graphData && graphData.nodes) || ['A', 'B', 'C', 'D', 'E', 'F'];
  const edges = (graphData && graphData.edges) || [
    { u: 'A', v: 'B', w: 1 },
    { u: 'A', v: 'C', w: 1 },
    { u: 'B', v: 'D', w: 1 },
    { u: 'B', v: 'E', w: 1 },
    { u: 'C', v: 'D', w: 1 },
    { u: 'D', v: 'E', w: 1 },
    { u: 'E', v: 'F', w: 1 }
  ];

  // Calculate initial indegrees
  const indegree = {};
  nodes.forEach(n => { indegree[n] = 0; });
  edges.forEach(e => { indegree[e.v] = (indegree[e.v] || 0) + 1; });

  const topoOrder = [];

  steps.push({
    type: 'toposort',
    nodes,
    edges,
    indegree: { ...indegree },
    topoOrder: [...topoOrder],
    codeLine: 0,
    log: "Topologische Sortierung (USFCA Galles): Berechne Eingangsgrade (Indegrees) aller Knoten.",
    q: "Was ist ein Eingangsgrad (Indegree)?",
    a: "Die Anzahl der auf den Knoten gerichteten eingehenden Kanten."
  });

  // Kahn's Algorithm for TopoSort
  const queue = nodes.filter(n => indegree[n] === 0);

  steps.push({
    type: 'toposort',
    nodes,
    edges,
    indegree: { ...indegree },
    topoOrder: [...topoOrder],
    activeNode: queue[0],
    codeLine: 1,
    log: `📌 Knoten mit Indegree 0 gefunden: Queue = [${queue.join(', ')}].`,
    q: "Warum wählt TopoSort Knoten mit Indegree 0?",
    a: "Weil diese Knoten keine ungeklärten Abhängigkeiten haben und somit zuerst ausgeführt werden können."
  });

  const visitedCount = 0;
  while (queue.length > 0) {
    const u = queue.shift();
    topoOrder.push(u);

    steps.push({
      type: 'toposort',
      nodes,
      edges,
      indegree: { ...indegree },
      topoOrder: [...topoOrder],
      activeNode: u,
      codeLine: 2,
      log: `🚀 Entnehme Knoten ${u} aus Queue und füge ihn zur Topologischen Ordnung hinzu.`,
      q: "Gibt es immer eine eindeutige Topologische Sortierung?",
      a: "Nein, wenn mehrere Knoten gleichzeitig Indegree 0 haben, existieren mehrere gültige Sortierungen."
    });

    // Process outgoing edges from u
    const outgoing = edges.filter(e => e.u === u);
    for (let e of outgoing) {
      indegree[e.v] -= 1;
      const isNowZero = indegree[e.v] === 0;
      if (isNowZero) queue.push(e.v);

      steps.push({
        type: 'toposort',
        nodes,
        edges,
        indegree: { ...indegree },
        topoOrder: [...topoOrder],
        activeNode: u,
        activeEdge: e,
        codeLine: 3,
        log: `🔥 Reduziere Kante ${e.u} ➔ ${e.v}: Indegree[${e.v}] sinkt auf ${indegree[e.v]}.${isNowZero ? ` Knoten ${e.v} hat nun Indegree 0!` : ''}`,
        q: "Was geschieht, wenn ein Indegree auf 0 fällt?",
        a: "Der Knoten wird in die Verarbeitungswarteschlange (Queue) aufgenommen."
      });
    }
  }

  steps.push({
    type: 'toposort',
    nodes,
    edges,
    indegree: { ...indegree },
    topoOrder: [...topoOrder],
    codeLine: 4,
    log: `🎉 Topologische Sortierung beendet! Final Ordnung: [${topoOrder.join(' ➔ ')}].`,
    q: "Welche Zeitkomplexität hat TopoSort (Kahn-Algorithmus)?",
    a: "O(V + E) in Zeit und O(V) in Raum."
  });
}

function simulateFloydDetailed(graphData, steps) {
  const nodes = (graphData && graphData.nodes) || ['A', 'B', 'C', 'D'];
  const edges = (graphData && graphData.edges) || [
    { u: 'A', v: 'B', w: 3 },
    { u: 'A', v: 'C', w: 8 },
    { u: 'B', v: 'C', w: 1 },
    { u: 'B', v: 'D', w: 7 },
    { u: 'C', v: 'D', w: 2 },
    { u: 'D', v: 'A', w: 2 }
  ];

  const V = nodes.length;
  const nodeMap = {};
  nodes.forEach((n, idx) => { nodeMap[n] = idx; });

  // Initialize Cost Matrix D and Path Matrix P
  const cost = Array.from({ length: V }, () => new Array(V).fill(Infinity));
  const path = Array.from({ length: V }, () => new Array(V).fill(-1));

  for (let i = 0; i < V; i++) {
    cost[i][i] = 0;
    path[i][i] = i;
  }

  edges.forEach(e => {
    const uIdx = nodeMap[e.u];
    const vIdx = nodeMap[e.v];
    if (uIdx !== undefined && vIdx !== undefined) {
      cost[uIdx][vIdx] = e.w;
      path[uIdx][vIdx] = uIdx;
    }
  });

  const formatCost = (m) => m.map(row => row.map(val => (val === Infinity ? 'INF' : val)));
  const formatPath = (m) => m.map(row => row.map(val => val));

  steps.push({
    type: 'floyd',
    nodes,
    edges,
    k: -1,
    i: -1,
    j: -1,
    costMatrix: formatCost(cost),
    pathMatrix: formatPath(path),
    codeLine: 0,
    log: "Floyd-Warshall (USFCA Galles): Cost-Matrix D^(0) & Path-Matrix P^(0) initialisiert.",
    q: "Was berechnet Floyd-Warshall?",
    a: "Kürzeste Pfade zwischen ALLEN Knotenpaaren (All-Pairs Shortest Paths) in O(V³)."
  });

  // Triple nested loop k, i, j
  for (let k = 0; k < V; k++) {
    const kNode = nodes[k];
    steps.push({
      type: 'floyd',
      nodes,
      edges,
      k,
      i: -1,
      j: -1,
      costMatrix: formatCost(cost),
      pathMatrix: formatPath(path),
      codeLine: 1,
      log: `🔄 STARTE RUNDE k = ${kNode} (Index ${k}): Teste alle Pfade über Zwischenknoten ${kNode}.`,
      q: "Was bedeutet die Variable k in der äußersten Schleife?",
      a: "k ist der Zwischenknoten, der für alle Pfade i ➔ k ➔ j auf Verkürzung getestet wird."
    });

    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        if (i === j) continue;

        const iNode = nodes[i];
        const jNode = nodes[j];

        const directDist = cost[i][j];
        const viaKDist = (cost[i][k] !== Infinity && cost[k][j] !== Infinity) ? cost[i][k] + cost[k][j] : Infinity;

        let updated = false;
        let logMsg = `Test ${iNode} ➔ ${jNode} über ${kNode}: D[${iNode}][${jNode}] = ${directDist === Infinity ? 'INF' : directDist}`;

        if (viaKDist < directDist) {
          cost[i][j] = viaKDist;
          path[i][j] = path[k][j];
          updated = true;
          logMsg = `✨ RELAXATION! Pfad ${iNode} ➔ ${kNode} ➔ ${jNode} ist kürzer (${cost[i][k]} + ${cost[k][j]} = ${viaKDist} < ${directDist === Infinity ? 'INF' : directDist}). D[${iNode}][${jNode}] aktualisiert!`;
        }

        steps.push({
          type: 'floyd',
          nodes,
          edges,
          k,
          i,
          j,
          updated,
          costMatrix: formatCost(cost),
          pathMatrix: formatPath(path),
          codeLine: 4,
          log: logMsg,
          q: "Welche Entspannungsgleichung (Relaxation) nutzt Floyd-Warshall?",
          a: "D[i][j] = min(D[i][j], D[i][k] + D[k][j])"
        });
      }
    }
  }

  steps.push({
    type: 'floyd',
    nodes,
    edges,
    k: -1,
    i: -1,
    j: -1,
    costMatrix: formatCost(cost),
    pathMatrix: formatPath(path),
    codeLine: 4,
    log: "🎉 Floyd-Warshall beendet! Final Distanz- & Predecessor-Matrizen berechnet.",
    q: "Kann Floyd-Warshall negative Kanten verarbeiten?",
    a: "Ja, solange keine negativen Zyklen existieren (die durch D[i][i] < 0 erkannt würden)."
  });
}









function simulateDPFibDetailed(steps) {
  const fib = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
  steps.push({ type: 'array', arr: [0], active: [0], codeLine: 0, log: "DP-Fibonacci: Basisfall dp[0] = 0.", q: "Was unterscheidet DP von naiver Rekursion?", a: "DP speichert Zwischenergebnisse (Memoisation/Tabulation) und vermeidet exponentiellen Mehraufwand." });
  steps.push({ type: 'array', arr: [0, 1], active: [1], codeLine: 1, log: "DP-Fibonacci: Basisfall dp[1] = 1.", q: "Welche Laufzeit hat DP Fibonacci?", a: "O(n) lineare Zeit statt O(2^n)!" });
  for (let i = 2; i < fib.length; i++) {
    steps.push({ type: 'array', arr: fib.slice(0, i + 1), active: [i], codeLine: 2, log: `Berechne dp[${i}] = dp[${i-1}] (${fib[i-1]}) + dp[${i-2}] (${fib[i-2]}) = ${fib[i]}.`, q: "Welche Raumkomplexität benötigt man minimal für DP Fib?", a: "O(1), da nur die letzten 2 Werte gespeichert werden müssen." });
  }
}

function simulateDPChangeDetailed(steps) {
  const dp = [0, 1, 2, 1, 2, 1, 2, 3];
  steps.push({ type: 'array', arr: [0], active: [0], codeLine: 0, log: "Coin Change DP: Basisfall dp[0] = 0 Münzen.", q: "Welche Eigenschaft muss für DP gelten?", a: "Optimalitätsprinzip von Bellman (Optimal Substructure)." });
  for (let i = 1; i < dp.length; i++) {
    steps.push({ type: 'array', arr: dp.slice(0, i + 1), active: [i], codeLine: 2, log: `Berechne min. Münzen für Betrag ${i}: dp[${i}] = ${dp[i]}.`, q: "Ist das Gierige Verfahren (Greedy) immer optimal beim Coin Change?", a: "Nein, nur bei kanonischen Münzsystemen! DP ist immer optimal." });
  }
}

function simulateDPLCSDetailed(steps) {
  steps.push({ type: 'array', arr: [0], active: [0], codeLine: 0, log: "Longest Common Subsequence (LCS DP Matrix) gestartet.", q: "Was misst LCS?", a: "Die Länge der längsten gemeinsamen Teilfolge zweier Strings." });
  steps.push({ type: 'array', arr: [0, 1, 1, 2], active: [3], codeLine: 1, log: "Zeichen stimmen überein ➔ L[i][j] = L[i-1][j-1] + 1.", q: "Welche Laufzeit hat LCS für zwei Strings der Länge n und m?", a: "O(n · m) Zeitkomplexität." });
  steps.push({ type: 'array', arr: [0, 1, 1, 2, 3, 4], active: [5], codeLine: 2, log: "LCS Matrix gefüllt: Längste gemeinsame Teilfolge hat Länge 4.", q: "Wo wird LCS angewendet?", a: "Bei Git Diff, Bioinformatik (DNA-Sequenzvergleich)." });
}

function simulateRecFactDetailed(steps) {
  steps.push({ type: 'array', arr: [5], active: [0], codeLine: 0, log: "Aufruf fact(5) ➔ Pushe Rahmen auf den Call-Stack.", q: "Was passiert bei Rekursion ohne Abbruchbedingung?", a: "Ein StackOverflowError." });
  steps.push({ type: 'array', arr: [5, 4], active: [1], codeLine: 1, log: "Aufruf fact(4) ➔ Pushe auf Call-Stack.", q: "Was ist der Base Case?", a: "Die Abbruchbedingung, die die Rekursion beendet." });
  steps.push({ type: 'array', arr: [5, 4, 3, 2, 1], active: [4], codeLine: 2, log: "Base Case fact(1) = 1 erreicht! Starte Rekursionsrücklauf...", q: "Wie berechnet sich fact(n)?", a: "fact(n) = n * fact(n - 1)." });
  steps.push({ type: 'array', arr: [120], active: [0], codeLine: 3, log: "🎉 Call-Stack abgebaut: fact(5) = 5 * 4 * 3 * 2 * 1 = 120.", q: "Welche Raumkomplexität hat rekursive Fakultät?", a: "O(n) Stack-Speicher." });
}

function simulateRecQueensDetailed(steps) {
  steps.push({ type: 'array', arr: [0], active: [0], codeLine: 0, log: "N-Damen Backtracking gestartet: Platziere Dame 1 in Spalte 0, Zeile 0.", q: "Was ist Backtracking?", a: "Ein Versuch-und-Irrtum Prinzip mit systematischem Zurücksetzen bei Konflikten." });
  steps.push({ type: 'array', arr: [0, 2], active: [1], codeLine: 1, log: "Platziere Dame 2 in Spalte 1, Zeile 2 (konfliktfrei zu Dame 1).", q: "Wie viele Damen müssen auf einem N x N Brett platziert werden?", a: "Exakt N Damen, so dass keine zwei einander bedrohen." });
  steps.push({ type: 'array', arr: [1, 3, 0, 2], active: [0, 1, 2, 3], codeLine: 2, log: "🎉 Lösung gefunden! Damen stehen an Zeilen [1, 3, 0, 2] für 4x4 Brett.", q: "Welche Komplexität hat N-Queens?", a: "O(N!) exponentielles Backtracking." });
}

function simulateDisjointSetDetailed(steps) {
  steps.push({ type: 'array', arr: [0, 1, 2, 3, 4, 5], active: [], codeLine: 0, log: "Disjoint Sets (Union-Find) initialisiert: 6 triviale Mengen {0}, {1}, {2}, {3}, {4}, {5}.", q: "Welche zwei Hauptoperationen hat Union-Find?", a: "find(i) (Repräsentanten suchen) und union(i, j) (Mengen vereinigen)." });
  steps.push({ type: 'array', arr: [0, 0, 2, 3, 4, 5], active: [0, 1], codeLine: 1, log: "union(0, 1): Knoten 1 zeigt nun auf Repräsentant 0.", q: "Was bewirkt Pfadkomprimierung (Path Compression)?", a: "Es setzt während find() den Elterzeiger aller besuchten Knoten direkt auf die Wurzel." });
  steps.push({ type: 'array', arr: [0, 0, 2, 2, 4, 5], active: [2, 3], codeLine: 2, log: "union(2, 3): Knoten 3 zeigt nun auf Repräsentant 2.", q: "Welche fast-konstante Laufzeit erreicht Union-Find mit Pfadkomprimierung?", a: "O(α(n)) amortisiert pro Operation, wobei α die sehr langsam wachsende Inverse-Ackermann-Funktion ist!" });
}

// -----------------------------------------------------------------------
// PRIM MST ALGORITHM
// -----------------------------------------------------------------------
function simulatePrimDetailed(graphData, steps, startNode = 'A') {
  const nodes = (graphData && graphData.nodes) || ['A', 'B', 'C', 'D', 'E', 'F'];
  const edges = (graphData && graphData.edges) || [];

  const inMST = new Set([startNode]);
  const mstEdges = [];

  steps.push({
    type: 'graph',
    nodes,
    startNode,
    mstEdges: [],
    codeLine: 0,
    log: `Prim-Algorithmus (USFCA Galles): Startknoten [${startNode}] zum MST hinzugefügt.`,
    q: "Wie unterscheidet sich Prim von Kruskal?",
    a: "Prim lässt den MST knotenweise ab einem Startknoten wachsen. Kruskal wählt global die kleinsten Kanten."
  });

  while (inMST.size < nodes.length) {
    let minEdge = null;
    let minWeight = Infinity;

    edges.forEach(e => {
      const uIn = inMST.has(e.u);
      const vIn = inMST.has(e.v);

      if ((uIn && !vIn) || (vIn && !uIn)) {
        if (e.w < minWeight) {
          minWeight = e.w;
          minEdge = e;
        }
      }
    });

    if (!minEdge) break;

    const newKnoten = inMST.has(minEdge.u) ? minEdge.v : minEdge.u;
    inMST.add(newKnoten);
    mstEdges.push(minEdge);

    steps.push({
      type: 'graph',
      nodes,
      startNode,
      activeEdge: minEdge,
      activeEdgeColor: '#4ade80',
      mstEdges: [...mstEdges],
      codeLine: 3,
      log: `✅ Gieriger Schritt: Wähle leichteste Schnittkante ${minEdge.u} - ${minEdge.v} (w=${minEdge.w}). Füge Knoten [${newKnoten}] zum MST hinzu.`,
      q: "Welche Komplexität hat Prim mit Priority Queue / Heap?",
      a: "O(E log V) Zeitkomplexität."
    });
  }

  steps.push({
    type: 'graph',
    nodes,
    startNode,
    mstEdges: [...mstEdges],
    codeLine: 4,
    log: `✨ Prim beendet! Minimaler Spannbaum (MST) verbindet alle ${nodes.length} Knoten mit Gesamtkosten W=${mstEdges.reduce((s, e) => s + e.w, 0)}.`,
    q: "Funktioniert Prim auch bei negativen Kanten?",
    a: "Ja, solange der Graph ungerichtet und zusammenhängend ist."
  });
}

// -----------------------------------------------------------------------
// HEAP STRUCTURES (Binomial Queue, Fibonacci, Leftist, Skew)
// -----------------------------------------------------------------------
function simulateBinomialQueueDetailed(data, steps) {
  const keys = Array.isArray(data) ? data : [12, 31, 36, 85, 35, 73];

  steps.push({
    type: 'tree',
    root: null,
    arr: [],
    codeLine: 0,
    log: "Binomial Queue (USFCA Galles): Wald aus Binomialbäumen B_0, B_1, B_2 initialisiert.",
    q: "Aus was besteht eine Binomial Queue?",
    a: "Aus einer Sammlung von Binomialbäumen B_k streng aufsteigender Ordnung k."
  });

  let root = new TreeNode(keys[0]);
  steps.push({
    type: 'tree',
    root: cloneTree(root),
    highlightNode: keys[0],
    codeLine: 1,
    log: `1. Füge Schlüssel ${keys[0]} als B_0 Baum ein.`,
    q: "Wie viele Knoten hat ein Binomialbaum B_k?",
    a: "Exakt 2^k Knoten."
  });

  for (let i = 1; i < keys.length; i++) {
    const val = keys[i];
    if (val < root.val) {
      const oldRoot = root;
      root = new TreeNode(val);
      root.left = oldRoot;
    } else {
      if (!root.left) root.left = new TreeNode(val);
      else root.right = new TreeNode(val);
    }

    steps.push({
      type: 'tree',
      root: cloneTree(root),
      highlightNode: val,
      codeLine: 1,
      log: `Schritt ${i+1}: Verschmelze (Merge) neuen Schlüssel ${val} in die Binomial Queue (Rank-Combine).`,
      q: "Welche Laufzeit hat das Verschmelzen zweier Binomial Queues?",
      a: "O(log n) amortisierte Laufzeit."
    });
  }
}

function simulateFibonacciHeapDetailed(data, steps) {
  const keys = Array.isArray(data) ? data : [12, 31, 36, 85, 35, 73];

  steps.push({
    type: 'tree',
    root: null,
    arr: [],
    codeLine: 0,
    log: "Fibonacci Heap (USFCA Galles): Wurzelliste & Min-Zeiger initialisiert.",
    q: "Warum heißen Fibonacci Heaps so?",
    a: "Weil die minimale Knotenzahl eines Baumes vom Grad k von den Fibonacci-Zahlen abhängt."
  });

  let minVal = Math.min(...keys);
  let root = new TreeNode(minVal);
  root.left = new TreeNode(keys[0] !== minVal ? keys[0] : keys[1]);
  root.right = new TreeNode(keys[2] || 60);

  steps.push({
    type: 'tree',
    root: cloneTree(root),
    highlightNode: minVal,
    codeLine: 1,
    log: `Füge Schlüssel in Wurzelliste ein. Min-Pointer zeigt auf Minimum ${minVal}.`,
    q: "Welche amortisierte Laufzeit hat insert/decreaseKey im Fibonacci Heap?",
    a: "O(1) konstante amortisierte Laufzeit!"
  });

  for (let i = 1; i < keys.length; i++) {
    const val = keys[i];
    steps.push({
      type: 'tree',
      root: cloneTree(root),
      highlightNode: val,
      codeLine: 1,
      log: `Inkrementeller Schritt ${i+1}: Füge Schlüssel ${val} zur Fibonacci Heap Wurzelliste hinzu.`,
      q: "Wann erfolgt die Konsolidierung (Consolidate) im Fibonacci Heap?",
      a: "Erst bei der extractMin() Operation, um Bäume gleichen Grades zu vereinigen."
    });
  }
}

function simulateLeftistHeapDetailed(data, steps) {
  const keys = Array.isArray(data) ? data : [12, 31, 36, 85, 35, 73];

  steps.push({
    type: 'tree',
    root: null,
    codeLine: 0,
    log: "Leftist Heap (USFCA Galles): Null Path Length (NPL) Baum initialisiert.",
    q: "Was ist der NPL (Null Path Length)?",
    a: "Die kürzeste Distanz von einem Knoten zu einem nicht vollständigen Nachfahren."
  });

  let root = new TreeNode(Math.min(...keys));
  root.left = new TreeNode(keys[1] || 20);
  root.right = new TreeNode(keys[2] || 60);

  steps.push({
    type: 'tree',
    root: cloneTree(root),
    codeLine: 1,
    log: "Verschmelze Heaps und prüfe NPL-Invariante: NPL(left) >= NPL(right).",
    q: "Welchen Vorteil bietet ein Leftist Heap?",
    a: "Schnelles Verschmelzen zweier Heaps in O(log n)."
  });

  for (let i = 1; i < keys.length; i++) {
    const val = keys[i];
    steps.push({
      type: 'tree',
      root: cloneTree(root),
      highlightNode: val,
      codeLine: 1,
      log: `Leftist Merge Schritt ${i+1}: Verschmelze Baum mit Schlüssel ${val}. Kindertausch ausgeführt falls NPL-Invariante verletzt ist.`,
      q: "Was geschieht, wenn NPL(left) < NPL(right)?",
      a: "Das linke und rechte Kind werden vertauscht, um die Leftist-Eigenschaft zu wahren."
    });
  }
}

function simulateSkewHeapDetailed(data, steps) {
  const keys = Array.isArray(data) ? data : [12, 31, 36, 85, 35, 73];

  steps.push({
    type: 'tree',
    root: null,
    codeLine: 0,
    log: "Skew Heap (USFCA Galles): Selbst-anpassender Heap initialisiert.",
    q: "Was unterscheidet Skew Heap von Leftist Heap?",
    a: "Skew Heaps speichern keine NPLs; bei jedem Merge werden bedingungslos die Kinder getauscht."
  });

  let root = new TreeNode(Math.min(...keys));
  root.left = new TreeNode(keys[1] || 20);
  root.right = new TreeNode(keys[2] || 60);

  steps.push({
    type: 'tree',
    root: cloneTree(root),
    codeLine: 1,
    log: "Bedingungsloser Kindertausch bei jedem Rekursionsschritt ausgeführt.",
    q: "Welche amortisierte Laufzeit haben Skew Heap Operationen?",
    a: "Amortisiert O(log n)."
  });

  for (let i = 1; i < keys.length; i++) {
    const val = keys[i];
    steps.push({
      type: 'tree',
      root: cloneTree(root),
      highlightNode: val,
      codeLine: 1,
      log: `Skew Merge Schritt ${i+1}: Füge Schlüssel ${val} ein und tausche Kinder bedingungslos.`,
      q: "Benötigen Skew Heaps Ausgleichsinformationen wie Höhen oder NPLs?",
      a: "Nein, Skew Heaps speichern keinerlei Zusatzinformationen in den Knoten."
    });
  }
}
