/**
 * Todo model - enhanced
 * Attributes:
 * - title: string, required
 * - description: string (optional)
 * - priority: string enum ['low','medium','high'] with default 'medium'
 * - dueDate: string (ISO date) optional
 * - tags: json array of strings
 * - isDone: boolean (default false)
 * - completedAt: string (ISO date) timestamp when marked done
 *
 * Class methods:
 * - markDone(id): marks a todo done and sets completedAt
 */

module.exports = {
  attributes: {
    title: { type: 'string', required: true, description: 'Short title for the todo' },
    description: { type: 'string', allowNull: true, description: 'Longer details' },
    priority: { type: 'string', isIn: ['low', 'medium', 'high'], defaultsTo: 'medium' },
    dueDate: { type: 'string', columnType: 'datetime', allowNull: true },
    tags: { type: 'json', defaultsTo: [] },
    isDone: { type: 'boolean', defaultsTo: false },
    completedAt: { type: 'string', columnType: 'datetime', allowNull: true }
  },

  // Lifecycle callbacks
  beforeUpdate(valuesToUpdate) {
    // If isDone is being set true and completedAt is not already set, populate it
    if (typeof valuesToUpdate.isDone !== 'undefined' && valuesToUpdate.isDone) {
      if (!valuesToUpdate.completedAt) {
        valuesToUpdate.completedAt = new Date().toISOString();
      }
    }
  },

  // Custom model/class methods
  async markDone(id) {
    if (!id) throw new Error('id is required');
    // Use native Waterline/ORM methods available on the model
    const updated = await Todo.updateOne({ id }).set({ isDone: true, completedAt: new Date().toISOString() });
    return updated;
  }
};
