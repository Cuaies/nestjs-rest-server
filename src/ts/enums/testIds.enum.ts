/**
 * Enum for test ids.
 */
export enum TestIds {
  /**
   * A valid id that exists in the database.
   */
  EXISTENT = 1,
  /**
   * A valid id that exists in the database, and the resource belongs to the user.
   */
  LINKED = 2,
  /**
   * A valid id that exists in the database, and the resource does not belong to the user.
   */
  FOREIGN = 3,
  /**
   * An invalid id that does not exist in the database.
   */
  NON_EXISTENT = 99999,
}
