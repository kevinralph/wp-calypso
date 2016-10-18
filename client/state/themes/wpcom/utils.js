/**
 * External dependencies
 */
import { omit, omitBy } from 'lodash';

/**
 * Internal dependencies
 */
import { DEFAULT_THEME_QUERY } from './constants';

/**
 * Constants
 */
const REGEXP_SERIALIZED_QUERY = /^((\d+):)?(.*)$/;

/**
 * Utility
 */

/**
 * Returns a normalized themes query, excluding any values which match the
 * default theme query.
 *
 * @param  {Object} query Themes query
 * @return {Object}       Normalized themes query
 */
export function getNormalizedThemesQuery( query ) {
	return omitBy( query, ( value, key ) => DEFAULT_THEME_QUERY[ key ] === value );
}

/**
 * Returns a serialized themes query
 *
 * @param  {Object} query  Themes query
 * @param  {Number} siteId Optional site ID
 * @return {String}        Serialized themes query
 */
export function getSerializedThemesQuery( query = {}, siteId ) {
	const normalizedQuery = getNormalizedThemesQuery( query );
	const serializedQuery = JSON.stringify( normalizedQuery );

	if ( siteId ) {
		return [ siteId, serializedQuery ].join( ':' );
	}

	return serializedQuery;
}

/**
 * Returns an object with details related to the specified serialized query.
 * The object will include siteId and/or query object, if can be parsed.
 *
 * @param  {String} serializedQuery Serialized themes query
 * @return {Object}                 Deserialized themes query details
 */
export function getDeserializedThemesQueryDetails( serializedQuery ) {
	let siteId, query;

	const matches = serializedQuery.match( REGEXP_SERIALIZED_QUERY );
	if ( matches ) {
		siteId = Number( matches[ 2 ] ) || undefined;
		try {
			query = JSON.parse( matches[ 3 ] );
		} catch ( error ) {}
	}

	return { siteId, query };
}

/**
 * Returns a serialized themes query, excluding any page parameter
 *
 * @param  {Object} query  Themes query
 * @param  {Number} siteId Optional site ID
 * @return {String}        Serialized themes query
 */
export function getSerializedThemesQueryWithoutPage( query, siteId ) {
	return getSerializedThemesQuery( omit( query, 'page' ), siteId );
}