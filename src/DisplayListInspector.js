
function log(what) {
    window.console.log(what);
}

export function walk(node, walker) {
    walker.inspect(node);
    if (node.children) {
        node.children.forEach(child => {
            walker.depth += 1;
            walk(child, walker);
            walker.depth -= 1;
        });
    }
}

export class Walker {
    constructor() {
        this.depth = 0;
        this.output = [];
    }

    inspect(node=null) {
        if (node !== null) {
            let tree = this._tree();
            let nodeData = this._nodeData(node);
            let parentData = this._nodeData(node.parent);
            this.output.push(`${tree} ${nodeData} child of ${parentData}\n`);
        } else {
            this.output.push('\n');
        }
    }

    report() {
        log('Report Begin');
        log(this.output.join(''));
        log('Report End');
        this.output.length = 0;
    }

    _nodeData(node) {
        return `${node.constructor.name}[${node.name}]`;
    }

    _tree() {
        let depth = this.depth;
        let treeTrunk = '|';
        let treeBranch = '-';
        let tree = [];
        tree.push(depth > 0 ? treeTrunk.repeat(depth) : treeTrunk);
        if (depth === 1) {
            tree.push(treeBranch);
        } else {
            tree.push(treeBranch.repeat(depth));
        }
        return tree.join('');
    }
}

export class DisplayListInspector {
    constructor() {
        this.walker = new Walker();
    }

    inspect(what, maxDepth=0) {
        this._walkTree(what, this.walker, maxDepth);
        this.walker.report();
    }

    _walkTree(node, walker, maxDepth) {
        walker.inspect(node);
        if (maxDepth > 0 && walker.depth === maxDepth) {
            return;
        }

        if (node.children) {
            node.children.forEach(child => {
                walker.depth += 1;
                this._walkTree(child, walker, maxDepth);
                walker.depth -= 1;
            });
        }
    }
}
