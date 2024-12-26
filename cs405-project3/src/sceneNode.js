/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        // current node's transformation matrix
        const nodeTransformation = this.trs.getTransformationMatrix();

        // applying transformations
        const transformedModel = MatrixMult(modelMatrix, nodeTransformation); // Combine model transformations
        const transformedModelView = MatrixMult(modelView, nodeTransformation); // Combine model view transformations
        const transformedMvp = MatrixMult(mvp, nodeTransformation); // Combine MVP transformations

        // Normal matrix transformation 
        const transformedNormals = MatrixMult(normalMatrix, nodeTransformation); 

        // Draw the current node's mesh
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

        // Recursively draw children with updated matrices
        for (let child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }

    

}