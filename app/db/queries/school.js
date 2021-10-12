/* eslint-disable max-lines */
export default {
  createSchool: `
        INSERT INTO school(
            id, name, category, about_us, address, email, phone_number, country,
            state, created_by, website, banner, student_population, teaching_staff,
            non_teaching_staff, curriculum, facilities, admission_requirements,
            school_fees_range
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
          $14, $15, $16, $17, $18, $19) 
        RETURNING id;
    `,
  getSchoolInfo: `
        SELECT
        id, name, category, about_us, address, email, phone_number, country,
        state, created_by, website, banner, student_population, teaching_staff,
        non_teaching_staff, curriculum, facilities, admission_requirements,
        school_fees_range
        FROM
            school
        WHERE 
            id = $1;
    `,
  getAllSchools: `
        SELECT
            id,
            name,
            category,
            about_us,
            address,
            facilities,
            banner,
            school_fees_range
        FROM
            school
        ORDER BY
            updated_at DESC
        OFFSET $1
        LIMIT $2;
    `,
  getTotalNumberOfSchools: `
        SELECT
            COUNT(id)
        FROM
            school;
    `,
  fetchSchoolReview: `
    SELECT id, subject, message, reviewer_id, reviewer_name, created_at 
    FROM review WHERE school_id =$3
    ORDER BY updated_at DESC
    OFFSET $1
    LIMIT $2;
  `,
  countSchoolReviews: 'SELECT COUNT(id) FROM review WHERE school_id = $1',
  fetchSingleUserSchools: `
    SELECT
      id, name, category, email, school_fees_range,
      address
    FROM
      school
    WHERE created_by=$3
    ORDER BY
      updated_at DESC
    OFFSET $1 LIMIT $2;
  `,
  fetchTotalNumberOfSingleUserSchools: `
    SELECT COUNT(id)
    FROM school
    WHERE created_by=$1`,
  saveSchoolReview: `
  INSERT INTO review (
    id,
    subject,
    message,
    reviewer_id,
    school_id,
    reviewer_name,
    rating
 ) VALUES ($1, $2, $3, $4, $5, $6, $7)
 RETURNING id AS review_id;`,
};
