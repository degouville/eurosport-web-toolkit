# About the type of changes

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

# Test plan

- [ ] Empty data
- [ ] Invalid data
- [ ] Correct data

# Checklist
### Before code review

- [ ] Move Jira ticket into PR
- [ ] Check with another developers that features sounds good

### After code review

- [ ] Move Jira ticket into QA

### After QA validation
If conflicts are present in github:
  - [ ] `git pull --rebase origin master`
  - [ ] Fix conflicts
  - [ ] `git rebase --continue` repeat until there is no more conflicts
  - [ ] `git push --force-with-lease`

If there's no conflicts
- [ ] squash and merge
- [ ] delete branch
