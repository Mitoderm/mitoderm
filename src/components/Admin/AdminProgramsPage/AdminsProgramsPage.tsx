'use client';

import { FC, useState } from 'react';
import { Event } from '@/types';
import Image from 'next/image';
import styles from './AdminPrograms.module.scss';

interface Props {
  events: Event[];
}

const AdminProgramsPage: FC<Props> = ({ events }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingProgram, setEditingProgram] = useState<Event | null>(null);
  return (
    <div className={styles.root}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Programs</h1>
          <p className={styles.subtitle}>
            Manage training programs, schedules and content
          </p>
        </div>
        <button type="button" className={styles.addButton}>
          <Image
            src="/images/icons/plus.svg"
            alt="Add Program"
            width={16}
            height={16}
          />
          Add Program
        </button>
      </div>

      <div className={styles.eventList}>
        {events.map((prog) => {
          const isExpanded = expandedId === prog.id;
          const ep = isExpanded ? editingProgram : null;

          return (
            <div key={prog.id} className={styles.programCard}>
              {/* Header row */}
              <div
                className={styles.cardHeaderRow}
                // onClick={() => toggleExpand(prog.id)}
              >
                <div className={styles.cardBodyMain}>
                  <div className={styles.badgeRow}>
                    <span className={styles.statusBadge}>
                      {prog.isAvailable}
                    </span>
                    <span className={styles.cityBadge}>{prog.city}</span>
                    <span className={styles.idText}>#{prog.id}</span>
                  </div>
                  <h3 className={styles.programTitle}>{prog.city}</h3>
                  <div className={styles.metaRow}>
                    <span className={styles.metaItem}>
                      <Image
                        src="/images/icons/mapPin.svg"
                        className={styles.icon3}
                        alt="map pin"
                        width={16}
                        height={16}
                      />
                      {prog.city}
                    </span>
                  </div>
                </div>
                <div className={styles.cardActions}>
                  <button
                    type="button"
                    className={styles.iconButton}
                    title="Duplicate"
                  ></button>
                  {/* {isExpanded ? (
                    <ChevronUp className={styles.chevronIcon} />
                  ) : (
                    <ChevronDown className={styles.chevronIcon} />
                  )} */}
                </div>
              </div>

              {/* Expanded edit panel */}
              {isExpanded && ep && (
                <div className={styles.expandedPanel}>
                  {/* General info */}
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>
                      <Image
                        src="/images/icons/edit.svg"
                        alt="edit"
                        width={16}
                        height={16}
                      />
                      General Information
                    </h4>
                    <div className={styles.formGrid}>
                      <div>
                        <label
                          className={styles.label}
                          htmlFor={`status-${prog.id}`}
                        >
                          Status
                        </label>
                        <select
                          id={`status-${prog.id}`}
                          className={styles.select}
                        >
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                      <div>
                        <label
                          className={styles.label}
                          htmlFor={`category-${prog.id}`}
                        >
                          Category
                        </label>
                        <input
                          id={`category-${prog.id}`}
                          className={styles.input}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitlePlain}>
                      Titles (Multilingual)
                    </h4>
                    <div className={styles.stack}>
                      <div>
                        <label
                          className={styles.label}
                          htmlFor={`title-en-${prog.id}`}
                        >
                          Title — English
                        </label>
                        <input
                          id={`title-en-${prog.id}`}
                          className={styles.input}
                        />
                      </div>
                    </div>
                    <div className={styles.stackSpaced}>
                      <div>
                        <label
                          className={styles.label}
                          htmlFor={`subtitle-en-${prog.id}`}
                        >
                          Subtitle — English
                        </label>
                        <textarea
                          id={`subtitle-en-${prog.id}`}
                          rows={2}
                          className={styles.textarea}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Locations */}
                  <div className={styles.section}>
                    <div className={styles.locationsHeader}>
                      <h4 className={styles.sectionTitle}>
                        <Image
                          src="/images/icons/mapPin.svg"
                          alt="map pin"
                          width={16}
                          height={16}
                        />
                        Locations & Schedule
                      </h4>
                      <button
                        type="button"
                        onClick={() => {}}
                        className={styles.linkButton}
                      >
                        Add Location
                      </button>
                    </div>
                    <div className={styles.stack}>{prog.city}</div>
                  </div>

                  {/* Actions */}
                  <div className={styles.footerActions}>
                    <button
                      type="button"
                      onClick={() => {}}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                    <div className={styles.footerButtons}>
                      <button type="button" className={styles.deleteButton}>
                        <Image
                          src="/images/icons/trash.svg"
                          className={styles.icon4}
                          alt="delete"
                          width={16}
                          height={16}
                        />
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => {}}
                        className={styles.saveButton}
                      >
                        <Image
                          src="/images/icons/check.svg"
                          className={styles.icon4}
                          alt="save changes"
                          width={16}
                          height={16}
                        />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProgramsPage;
